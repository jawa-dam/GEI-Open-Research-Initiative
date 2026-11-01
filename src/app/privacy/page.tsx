import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Notice",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Privacy Notice</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gei-text-muted text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">Data We Collect</h2>
              <p>
                When you apply to contribute or create an account, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Name and preferred display name</li>
                <li>Email address (kept private, never published)</li>
                <li>Professional title and institution (optional)</li>
                <li>Expertise description and research interests</li>
                <li>Website or ORCID profile link (optional)</li>
                <li>Submissions and contributions you create</li>
              </ul>
              <p className="mt-3">
                <strong className="text-gei-text">We do not collect</strong> date of birth,
                home address, phone number, government ID, or other unnecessary
                sensitive personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To process your application and manage your contributor account</li>
                <li>To communicate about your submissions and the research initiative</li>
                <li>To attribute published contributions (only with your explicit consent)</li>
                <li>To maintain the integrity and security of the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">Privacy Protections</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email addresses are never published or shared publicly</li>
                <li>Private submissions are visible only to you, assigned reviewers, and administrators</li>
                <li>Attribution on published work requires your explicit consent</li>
                <li>You may choose to be attributed by name, by affiliation, or anonymously</li>
                <li>Contact details are never published without consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">Attribution Choices</h2>
              <p>For each submission, you choose how you are attributed:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong className="text-gei-text">Named:</strong> Your name is displayed with the published contribution</li>
                <li><strong className="text-gei-text">Affiliation shown:</strong> Your name and institution are displayed</li>
                <li><strong className="text-gei-text">Anonymous:</strong> No identifying information is displayed</li>
              </ul>
              <p className="mt-2">
                Each choice requires explicit consent. You may change your attribution
                preference for unpublished submissions at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">Account Deletion</h2>
              <p>
                You may request deletion of your account and associated data by
                contacting the research team. Upon deletion:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Your account and profile data will be removed</li>
                <li>Unpublished submissions will be deleted</li>
                <li>Published contributions attributed to you will be anonymized unless otherwise agreed</li>
                <li>Audit logs referencing your account will be retained for security purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">Security</h2>
              <p>
                We employ industry-standard security practices including encrypted
                connections, secure session management, server-side authorization
                checks, and input validation. Passwords are hashed using bcrypt.
                Sessions use secure, HttpOnly cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">No Credential Verification</h2>
              <p>
                This application does not verify academic credentials, professional
                certifications, or institutional affiliations. Participation does not
                imply institutional endorsement, peer review certification, employment,
                or compensation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gei-text mb-3">Contact</h2>
              <p>
                For privacy inquiries, account deletion requests, or data access
                requests, contact the research lead through the application.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
