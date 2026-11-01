import type {
  APPLICATION_STATUSES,
  ATTRIBUTION_CHOICES,
  SUBMISSION_STATUSES,
  SUBMISSION_TYPES,
  USER_ROLES,
} from "./constants";

export type UserRole = (typeof USER_ROLES)[number];
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type SubmissionType = (typeof SUBMISSION_TYPES)[number];
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];
export type AttributionChoice = (typeof ATTRIBUTION_CHOICES)[number];

export interface User {
  id: string;
  email: string;
  name: string;
  displayName: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  discipline: string;
  professionalTitle?: string;
  institution?: string;
  expertise: string;
  researchQuestions: string;
  contributionTypes: string[];
  profileUrl?: string;
  examineOrChallenge: string;
  consentContact: boolean;
  consentAttribution: boolean;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface Submission {
  id: string;
  authorId: string;
  type: SubmissionType;
  title: string;
  discipline: string;
  content: string;
  abstract?: string;
  biblicalPassages?: string;
  sourceLanguageRefs?: string;
  bibliography?: string;
  attribution: AttributionChoice;
  status: SubmissionStatus;
  statusHistory: StatusChange[];
  assignedReviewer?: string;
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusChange {
  from: string;
  to: string;
  changedBy: string;
  changedAt: string;
  note?: string;
}

export interface ResearchEntry {
  id: string;
  code: string;
  title: string;
  category: string;
  question: string;
  scope: string;
  biblicalPassages: string[];
  sourceLanguageRefs: string[];
  conventionalReading: string;
  alternativeReading: string;
  geiProposal: string;
  evidence: string;
  counterarguments: string;
  testCriteria: string;
  bibliography: string[];
  version: string;
  lastUpdated: string;
  reviewState: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  targetType: string;
  targetId: string;
  performedBy: string;
  details: string;
  createdAt: string;
}
