import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { user } = session;
  const isReviewer = user.role === "reviewer" || user.role === "admin";
  const isAdmin = user.role === "admin";

  return (
    <>
      <Header user={{ name: user.name, role: user.role }} />
      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Welcome, {user.name}
            </h1>
            <p className="mt-2 text-gei-text-muted">
              Contributor workspace &middot; Role:{" "}
              <span className="capitalize text-gei-cyan">{user.role}</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Link
              href="/submissions/new"
              className="bg-gei-surface border border-gei-border rounded-xl p-6 hover:border-gei-cyan/50 transition-colors group"
            >
              <svg className="w-8 h-8 text-gei-cyan mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-gei-cyan transition-colors">
                New Submission
              </h3>
              <p className="text-sm text-gei-text-muted">
                Submit a question, critique, analysis, or reference
              </p>
            </Link>

            <Link
              href="/submissions"
              className="bg-gei-surface border border-gei-border rounded-xl p-6 hover:border-gei-cyan/50 transition-colors group"
            >
              <svg className="w-8 h-8 text-gei-cyan mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-gei-cyan transition-colors">
                My Submissions
              </h3>
              <p className="text-sm text-gei-text-muted">
                View and manage your submissions
              </p>
            </Link>

            <Link
              href="/profile"
              className="bg-gei-surface border border-gei-border rounded-xl p-6 hover:border-gei-cyan/50 transition-colors group"
            >
              <svg className="w-8 h-8 text-gei-cyan mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-gei-cyan transition-colors">
                Profile
              </h3>
              <p className="text-sm text-gei-text-muted">
                Manage your profile and visibility preferences
              </p>
            </Link>

            {isReviewer && (
              <Link
                href="/review"
                className="bg-gei-surface border border-gei-border rounded-xl p-6 hover:border-gei-cyan/50 transition-colors group"
              >
                <svg className="w-8 h-8 text-gei-magenta mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-gei-cyan transition-colors">
                  Review Queue
                </h3>
                <p className="text-sm text-gei-text-muted">
                  Review assigned submissions
                </p>
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className="bg-gei-surface border border-gei-border rounded-xl p-6 hover:border-gei-cyan/50 transition-colors group"
              >
                <svg className="w-8 h-8 text-gei-magenta mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-gei-cyan transition-colors">
                  Administration
                </h3>
                <p className="text-sm text-gei-text-muted">
                  Manage users, applications, and roles
                </p>
              </Link>
            )}

            <Link
              href="/research"
              className="bg-gei-surface border border-gei-border rounded-xl p-6 hover:border-gei-cyan/50 transition-colors group"
            >
              <svg className="w-8 h-8 text-gei-cyan mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-gei-cyan transition-colors">
                Evidence Room
              </h3>
              <p className="text-sm text-gei-text-muted">
                Browse the public research library
              </p>
            </Link>
          </div>

          {/* Status */}
          <div className="bg-gei-surface border border-gei-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Account Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gei-text-muted">Role:</span>{" "}
                <span className="capitalize text-gei-cyan font-medium">{user.role}</span>
              </div>
              <div>
                <span className="text-gei-text-muted">Email verified:</span>{" "}
                <span className={user.emailVerified ? "text-green-400" : "text-yellow-400"}>
                  {user.emailVerified ? "Yes" : "Pending"}
                </span>
              </div>
              <div>
                <span className="text-gei-text-muted">Email:</span>{" "}
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
