import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { listSubmissionsByAuthor } from "@/lib/db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Submissions",
  robots: { index: false, follow: false },
};

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-700/40 text-gray-300",
  submitted: "bg-blue-900/40 text-blue-300",
  triage: "bg-indigo-900/40 text-indigo-300",
  under_review: "bg-yellow-900/40 text-yellow-300",
  response_requested: "bg-orange-900/40 text-orange-300",
  published: "bg-green-900/40 text-green-300",
  not_published: "bg-red-900/40 text-red-300",
  withdrawn: "bg-gray-800/40 text-gray-400",
};

function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-gray-700/40 text-gray-300";
  return (
    <span
      className={`status-badge ${style}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function SubmissionsPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { user } = session;
  const submissions = await listSubmissionsByAuthor(user.id);

  return (
    <>
      <Header user={{ name: user.name, role: user.role }} />
      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Submissions</h1>
              <p className="mt-1 text-gei-text-muted">
                View and manage your research contributions
              </p>
            </div>
            <Link
              href="/submissions/new"
              className="inline-flex items-center px-5 py-2.5 bg-gei-cyan text-gei-near-black font-semibold rounded-lg hover:bg-gei-cyan/90 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Submission
            </Link>
          </div>

          {submissions.length === 0 ? (
            /* Empty state */
            <div className="bg-gei-surface border border-gei-border rounded-xl p-12 text-center">
              <svg
                className="w-16 h-16 text-gei-text-muted mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0H9.75m0 0v-3m3 3v-3m-9 8.25h13.5A2.25 2.25 0 0021 18V6.75A2.25 2.25 0 0018.75 4.5H5.25A2.25 2.25 0 003 6.75V18a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <h2 className="text-xl font-semibold mb-2">No submissions yet</h2>
              <p className="text-gei-text-muted mb-6 max-w-md mx-auto">
                Start contributing to the GEI research initiative by submitting
                a question, critique, technical analysis, source reference,
                correction, or collaboration offer.
              </p>
              <Link
                href="/submissions/new"
                className="inline-flex items-center px-6 py-3 bg-gei-cyan text-gei-near-black font-semibold rounded-lg hover:bg-gei-cyan/90 transition-colors"
              >
                Create Your First Submission
              </Link>
            </div>
          ) : (
            /* Submissions list */
            <div className="space-y-4">
              {/* Desktop table header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gei-text-muted">
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Discipline</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Date</div>
              </div>

              {submissions.map((s) => (
                <div
                  key={s.id}
                  className="bg-gei-surface border border-gei-border rounded-lg hover:border-gei-cyan/30 transition-colors"
                >
                  {/* Desktop row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-4">
                    <div className="col-span-4">
                      <p className="font-medium text-gei-text truncate">
                        {s.title}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gei-text-muted capitalize">
                        {s.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-sm text-gei-text-muted capitalize">
                        {s.discipline.replace(/-/g, " ")}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <StatusBadge status={s.status} />
                    </div>
                    <div className="col-span-2 text-sm text-gei-text-muted">
                      {formatDate(s.createdAt)}
                    </div>
                  </div>

                  {/* Mobile card */}
                  <div className="md:hidden p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-gei-text">{s.title}</p>
                      <StatusBadge status={s.status} />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gei-text-muted">
                      <span className="capitalize">
                        {s.type.replace(/_/g, " ")}
                      </span>
                      <span className="capitalize">
                        {s.discipline.replace(/-/g, " ")}
                      </span>
                      <span>{formatDate(s.createdAt)}</span>
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
