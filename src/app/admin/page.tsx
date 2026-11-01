import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { listUsers, listApplications, getAuditLog } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

const APP_STATUS_COLORS: Record<string, string> = {
  received: "bg-blue-900/30 text-blue-400 border-blue-700/30",
  under_review: "bg-yellow-900/30 text-yellow-400 border-yellow-700/30",
  accepted: "bg-green-900/30 text-green-400 border-green-700/30",
  waitlisted: "bg-orange-900/30 text-orange-400 border-orange-700/30",
  declined: "bg-red-900/30 text-red-400 border-red-700/30",
  withdrawn: "bg-gray-900/30 text-gray-400 border-gray-700/30",
};

const ROLE_COLORS: Record<string, string> = {
  member: "text-gei-cyan",
  reviewer: "text-gei-soft-pink",
  admin: "text-gei-magenta",
};

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { user } = session;
  if (user.role !== "admin") {
    return (
      <>
        <Header user={{ name: user.name, role: user.role }} />
        <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <svg className="w-16 h-16 text-gei-magenta mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <h1 className="text-2xl font-bold mb-2">Access Restricted</h1>
            <p className="text-gei-text-muted">
              Administration is available to administrators only.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const [users, applications, auditEntries] = await Promise.all([
    listUsers(),
    listApplications(),
    getAuditLog(30),
  ]);

  return (
    <>
      <Header user={{ name: user.name, role: user.role }} />
      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Administration</h1>
            <p className="mt-2 text-gei-text-muted">
              Manage users, applications, and review audit history
            </p>
          </div>

          {/* Role management note */}
          <div className="bg-gei-surface border border-gei-border rounded-lg p-4 mb-8 flex items-start gap-3">
            <svg className="w-5 h-5 text-gei-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <p className="text-sm text-gei-text-muted">
              <strong className="text-gei-text">Role policy:</strong> New accounts default to <span className="text-gei-cyan">member</span>. Reviewer and admin roles are granted explicitly by an administrator. Role changes and application status updates are managed through the API and are recorded in the audit log.
            </p>
          </div>

          {/* Users Section */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gei-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Users ({users.length})
            </h2>
            <div className="bg-gei-surface border border-gei-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gei-border text-left">
                      <th className="px-4 py-3 text-gei-text-muted font-medium">ID</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Name</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Email</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Role</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gei-text-muted">
                          No users registered yet.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="border-b border-gei-border/50 hover:bg-gei-surface-light/50">
                          <td className="px-4 py-3 font-mono text-xs text-gei-text-muted">
                            {u.id.slice(0, 8)}…
                          </td>
                          <td className="px-4 py-3 text-gei-text">{u.name}</td>
                          <td className="px-4 py-3 text-gei-text-muted">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`capitalize font-medium ${ROLE_COLORS[u.role] ?? "text-gei-text"}`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gei-text-muted">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Applications Section */}
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gei-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              Applications ({applications.length})
            </h2>
            <div className="bg-gei-surface border border-gei-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gei-border text-left">
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Name</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Discipline</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Status</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-6 text-center text-gei-text-muted">
                          No applications received yet.
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => (
                        <tr key={app.id} className="border-b border-gei-border/50 hover:bg-gei-surface-light/50">
                          <td className="px-4 py-3 text-gei-text">{app.name}</td>
                          <td className="px-4 py-3 text-gei-text-muted">{app.discipline}</td>
                          <td className="px-4 py-3">
                            <span className={`status-badge border ${APP_STATUS_COLORS[app.status] ?? "bg-gei-surface-light text-gei-text-muted border-gei-border"}`}>
                              {app.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gei-text-muted">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Audit Log Section */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-gei-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Audit Log (Recent)
            </h2>
            <div className="bg-gei-surface border border-gei-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gei-border text-left">
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Action</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Target</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Performed By</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Details</th>
                      <th className="px-4 py-3 text-gei-text-muted font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditEntries.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-6 text-center text-gei-text-muted">
                          No audit entries recorded yet.
                        </td>
                      </tr>
                    ) : (
                      auditEntries.map((entry) => (
                        <tr key={entry.id} className="border-b border-gei-border/50 hover:bg-gei-surface-light/50">
                          <td className="px-4 py-3 text-gei-text font-mono text-xs">
                            {entry.action}
                          </td>
                          <td className="px-4 py-3 text-gei-text-muted text-xs">
                            {entry.targetType}/{entry.targetId.slice(0, 8)}…
                          </td>
                          <td className="px-4 py-3 text-gei-text-muted text-xs">
                            {entry.performedBy === "system" || entry.performedBy === "anonymous"
                              ? entry.performedBy
                              : `${entry.performedBy.slice(0, 8)}…`}
                          </td>
                          <td className="px-4 py-3 text-gei-text-muted text-xs max-w-xs truncate">
                            {entry.details}
                          </td>
                          <td className="px-4 py-3 text-gei-text-muted text-xs whitespace-nowrap">
                            {new Date(entry.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
