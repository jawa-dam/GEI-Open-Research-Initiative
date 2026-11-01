import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { listSubmissionsForReview } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review Queue",
  robots: { index: false, follow: false },
};

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-blue-900/30 text-blue-400 border-blue-700/30",
  triage: "bg-yellow-900/30 text-yellow-400 border-yellow-700/30",
  under_review: "bg-purple-900/30 text-purple-400 border-purple-700/30",
};

export default async function ReviewPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { user } = session;
  if (user.role !== "reviewer" && user.role !== "admin") {
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
              The review queue is available to reviewers and administrators only.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const submissions = await listSubmissionsForReview();

  return (
    <>
      <Header user={{ name: user.name, role: user.role }} />
      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Review Queue</h1>
            <p className="mt-2 text-gei-text-muted">
              Submissions awaiting review &middot; {submissions.length} item{submissions.length !== 1 ? "s" : ""}
            </p>
          </div>

          {submissions.length === 0 ? (
            <div className="bg-gei-surface border border-gei-border rounded-xl p-12 text-center">
              <svg className="w-16 h-16 text-gei-text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">All Clear</h2>
              <p className="text-gei-text-muted">
                No submissions are awaiting review at this time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-gei-surface border border-gei-border rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`status-badge border ${STATUS_COLORS[sub.status] ?? "bg-gei-surface-light text-gei-text-muted border-gei-border"}`}>
                          {sub.status.replace("_", " ")}
                        </span>
                        <span className="text-xs font-mono bg-gei-cyan/10 text-gei-cyan px-2 py-0.5 rounded">
                          {sub.type.replace("_", " ")}
                        </span>
                        <span className="text-xs text-gei-text-muted">
                          {sub.discipline}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gei-text truncate">
                        {sub.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gei-text-muted">
                        <span>
                          Author: <code className="bg-gei-surface-light px-1 rounded">{sub.authorId.slice(0, 8)}…</code>
                        </span>
                        <span>
                          Submitted: {new Date(sub.createdAt).toLocaleDateString()}
                        </span>
                        {sub.assignedReviewer && (
                          <span>
                            Assigned to: <code className="bg-gei-surface-light px-1 rounded">{sub.assignedReviewer.slice(0, 8)}…</code>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 sm:items-end shrink-0">
                      <button
                        disabled
                        className="px-4 py-2 text-sm bg-gei-surface-light text-gei-text-muted border border-gei-border rounded-lg cursor-not-allowed opacity-60"
                        title="Status changes are managed through the API"
                      >
                        Update Status
                      </button>
                      <p className="text-xs text-gei-text-muted max-w-[200px] text-right">
                        Status changes go through the <code className="bg-gei-surface-light px-1 rounded">PATCH /api/submissions</code> endpoint.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
