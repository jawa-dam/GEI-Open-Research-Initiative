/**
 * Database abstraction layer.
 *
 * In production, replace this with a real database (PostgreSQL, etc.)
 * connected via an ORM like Prisma or Drizzle. This in-memory store
 * exists solely for development and testing — it resets on restart.
 *
 * The development mock is gated behind NODE_ENV === "development" AND
 * ENABLE_DEV_AUTH === "true". In production, these functions must be
 * backed by a real persistence layer.
 */

import { v4 as uuid } from "uuid";
import bcryptjs from "bcryptjs";
import type {
  Application,
  Submission,
  AuditLogEntry,
  UserRole,
} from "./types";

interface StoredUser {
  id: string;
  email: string;
  name: string;
  displayName: string;
  role: UserRole;
  emailVerified: boolean;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

const isDev = process.env.NODE_ENV === "development";
const devAuthEnabled = isDev && process.env.ENABLE_DEV_AUTH === "true";

// In-memory stores (development only — data lost on restart)
const users = new Map<string, StoredUser>();
const applications = new Map<string, Application>();
const submissions = new Map<string, Submission>();
const auditLog: AuditLogEntry[] = [];

// Seed a dev admin if dev auth is enabled
if (devAuthEnabled) {
  const adminId = uuid();
  const hash = bcryptjs.hashSync("DevAdmin12345!", 12);
  users.set(adminId, {
    id: adminId,
    email: "admin@dev.local",
    name: "Dev Admin",
    displayName: "Dev Admin",
    role: "admin",
    emailVerified: true,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
}): Promise<StoredUser | null> {
  if (!devAuthEnabled) {
    throw new Error(
      "Direct user creation requires a production database. See SETUP.md."
    );
  }

  const existing = await getUserByEmail(data.email);
  if (existing) return null;

  const id = uuid();
  const now = new Date().toISOString();
  const user: StoredUser = {
    id,
    email: data.email.toLowerCase().trim(),
    name: data.name.trim(),
    displayName: data.name.trim(),
    role: "member",
    emailVerified: false,
    passwordHash: await hashPassword(data.password),
    createdAt: now,
    updatedAt: now,
  };

  users.set(id, user);
  await logAudit("user_created", "user", id, "system", `User ${data.email} registered`);
  return user;
}

export async function getUserByEmail(
  email: string
): Promise<StoredUser | null> {
  for (const user of users.values()) {
    if (user.email === email.toLowerCase().trim()) return user;
  }
  return null;
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  return users.get(id) ?? null;
}

export async function updateUserRole(
  userId: string,
  newRole: UserRole,
  performedBy: string
): Promise<boolean> {
  const user = users.get(userId);
  if (!user) return false;

  const oldRole = user.role;
  user.role = newRole;
  user.updatedAt = new Date().toISOString();
  users.set(userId, user);

  await logAudit(
    "role_changed",
    "user",
    userId,
    performedBy,
    `Role changed from ${oldRole} to ${newRole}`
  );
  return true;
}

export async function createApplication(
  data: Omit<Application, "id" | "status" | "createdAt" | "updatedAt">
): Promise<Application> {
  const id = uuid();
  const now = new Date().toISOString();
  const application: Application = {
    ...data,
    id,
    status: "received",
    createdAt: now,
    updatedAt: now,
  };

  applications.set(id, application);
  await logAudit(
    "application_submitted",
    "application",
    id,
    "anonymous",
    `Application from ${data.name} for ${data.discipline}`
  );
  return application;
}

export async function getApplication(id: string): Promise<Application | null> {
  return applications.get(id) ?? null;
}

export async function listApplications(): Promise<Application[]> {
  return Array.from(applications.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"],
  reviewedBy: string,
  notes?: string
): Promise<boolean> {
  const app = applications.get(id);
  if (!app) return false;

  const oldStatus = app.status;
  app.status = status;
  app.reviewedBy = reviewedBy;
  app.reviewNotes = notes;
  app.updatedAt = new Date().toISOString();
  applications.set(id, app);

  await logAudit(
    "application_status_changed",
    "application",
    id,
    reviewedBy,
    `Status changed from ${oldStatus} to ${status}`
  );
  return true;
}

export async function createSubmission(
  data: Omit<Submission, "id" | "status" | "statusHistory" | "createdAt" | "updatedAt">
): Promise<Submission> {
  const id = uuid();
  const now = new Date().toISOString();
  const submission: Submission = {
    ...data,
    id,
    status: "draft",
    statusHistory: [],
    createdAt: now,
    updatedAt: now,
  };

  submissions.set(id, submission);
  await logAudit(
    "submission_created",
    "submission",
    id,
    data.authorId,
    `New ${data.type}: ${data.title}`
  );
  return submission;
}

export async function getSubmission(id: string): Promise<Submission | null> {
  return submissions.get(id) ?? null;
}

export async function listSubmissionsByAuthor(
  authorId: string
): Promise<Submission[]> {
  return Array.from(submissions.values())
    .filter((s) => s.authorId === authorId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function listSubmissionsForReview(): Promise<Submission[]> {
  return Array.from(submissions.values())
    .filter((s) => ["submitted", "triage", "under_review"].includes(s.status))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function updateSubmissionStatus(
  id: string,
  newStatus: Submission["status"],
  changedBy: string,
  note?: string
): Promise<boolean> {
  const submission = submissions.get(id);
  if (!submission) return false;

  const oldStatus = submission.status;
  submission.statusHistory.push({
    from: oldStatus,
    to: newStatus,
    changedBy,
    changedAt: new Date().toISOString(),
    note,
  });
  submission.status = newStatus;
  submission.updatedAt = new Date().toISOString();
  submissions.set(id, submission);

  await logAudit(
    "submission_status_changed",
    "submission",
    id,
    changedBy,
    `Status changed from ${oldStatus} to ${newStatus}`
  );
  return true;
}

export async function logAudit(
  action: string,
  targetType: string,
  targetId: string,
  performedBy: string,
  details: string
): Promise<void> {
  auditLog.push({
    id: uuid(),
    action,
    targetType,
    targetId,
    performedBy,
    details,
    createdAt: new Date().toISOString(),
  });
}

export async function getAuditLog(limit = 50): Promise<AuditLogEntry[]> {
  return auditLog.slice(-limit).reverse();
}

export async function listUsers(): Promise<
  Omit<StoredUser, "passwordHash">[]
> {
  return Array.from(users.values()).map(
    ({ passwordHash: _hash, ...user }) => user
  );
}
