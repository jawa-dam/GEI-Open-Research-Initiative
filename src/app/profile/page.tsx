import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { user } = session;

  return (
    <>
      <Header user={{ name: user.name, role: user.role }} />
      <main id="main-content" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8">Contributor Profile</h1>

          {/* Account Information */}
          <section className="bg-gei-surface border border-gei-border rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <dl className="space-y-4">
              <div className="sm:flex sm:gap-4">
                <dt className="text-sm text-gei-text-muted sm:w-40 shrink-0">Name</dt>
                <dd className="text-sm font-medium">{user.name}</dd>
              </div>
              <div className="sm:flex sm:gap-4">
                <dt className="text-sm text-gei-text-muted sm:w-40 shrink-0">Display Name</dt>
                <dd className="text-sm font-medium">{user.name}</dd>
              </div>
              <div className="sm:flex sm:gap-4">
                <dt className="text-sm text-gei-text-muted sm:w-40 shrink-0">Email</dt>
                <dd className="text-sm font-medium">
                  {user.email}
                  <span className="ml-2 text-xs bg-gei-surface-light text-gei-text-muted px-2 py-0.5 rounded">
                    Private
                  </span>
                </dd>
              </div>
              <div className="sm:flex sm:gap-4">
                <dt className="text-sm text-gei-text-muted sm:w-40 shrink-0">Role</dt>
                <dd className="text-sm font-medium capitalize text-gei-cyan">{user.role}</dd>
              </div>
              <div className="sm:flex sm:gap-4">
                <dt className="text-sm text-gei-text-muted sm:w-40 shrink-0">Email Verified</dt>
                <dd className="text-sm font-medium">
                  {user.emailVerified ? (
                    <span className="text-green-400">Verified</span>
                  ) : (
                    <span className="text-yellow-400">Pending verification</span>
                  )}
                </dd>
              </div>
            </dl>
          </section>

          {/* Attribution Preferences */}
          <section className="bg-gei-surface border border-gei-border rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">Attribution Preferences</h2>
            <p className="text-sm text-gei-text-muted mb-4">
              Choose how your name appears on published contributions. Each submission can set its own preference. These are the available choices:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-gei-surface-light rounded-lg p-3">
                <div className="w-2 h-2 rounded-full bg-gei-cyan mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Named</p>
                  <p className="text-xs text-gei-text-muted">Your name is displayed alongside your published contribution.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gei-surface-light rounded-lg p-3">
                <div className="w-2 h-2 rounded-full bg-gei-blue mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Affiliation Shown</p>
                  <p className="text-xs text-gei-text-muted">Your name and institutional affiliation are displayed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gei-surface-light rounded-lg p-3">
                <div className="w-2 h-2 rounded-full bg-gei-magenta mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Anonymous</p>
                  <p className="text-xs text-gei-text-muted">Your contribution is published without identifying information.</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gei-text-muted mt-4 italic">
              Attribution is chosen per submission. Each choice requires explicit consent. Contact details are never published.
            </p>
            <div className="mt-4 bg-gei-near-black/50 border border-gei-border rounded-lg p-3">
              <p className="text-xs text-gei-text-muted">
                Profile editing requires a connected database backend. See <code className="bg-gei-surface-light px-1 rounded">SETUP.md</code> for configuration.
              </p>
            </div>
          </section>

          {/* Privacy & Data */}
          <section className="bg-gei-surface border border-gei-border rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Privacy &amp; Data</h2>
            <div className="space-y-3 text-sm text-gei-text-muted">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gei-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p>Your email address is private and will not be shared publicly or with other contributors.</p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gei-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p>Submissions in draft status are visible only to you. Submitted work is visible to reviewers and administrators.</p>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gei-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <p>We store: name, email, role, submissions, and attribution preferences. We do not collect date of birth, home address, phone number, government ID, or other unnecessary sensitive data.</p>
              </div>
            </div>
          </section>

          {/* Account Deletion */}
          <section className="bg-gei-surface border border-gei-border rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-2">Account Deletion</h2>
            <p className="text-sm text-gei-text-muted mb-3">
              To request account deletion or to have your data removed, please contact the research administration team. Your request will be processed and confirmed.
            </p>
            <p className="text-sm text-gei-text-muted">
              Published contributions attributed to you can be re-attributed to &ldquo;Anonymous&rdquo; upon request. Withdrawn or draft submissions are deleted with your account.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="bg-gei-near-black/50 border border-gei-border rounded-lg p-4">
            <p className="text-xs text-gei-text-muted leading-relaxed">
              <strong className="text-gei-text">Notice:</strong> Membership in the GEI Open Research Initiative does not constitute peer review, academic certification, employment, compensation, or formal institutional affiliation. This application does not verify academic credentials or imply institutional endorsement. Contributions are evaluated on their merit and methodology.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
