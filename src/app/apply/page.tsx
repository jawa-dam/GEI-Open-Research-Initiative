"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DISCIPLINES, CONTRIBUTION_TYPES } from "@/lib/constants";

type FormMode = "full" | "follow";

interface FormErrors {
  [key: string]: string;
}

function ApplicationFormInner() {
  const searchParams = useSearchParams();
  const preselectedDiscipline = searchParams.get("discipline") ?? "";

  const [mode, setMode] = useState<FormMode>("full");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [expertise, setExpertise] = useState("");
  const [researchQuestions, setResearchQuestions] = useState("");
  const [contributionTypes, setContributionTypes] = useState<string[]>([]);
  const [profileUrl, setProfileUrl] = useState("");
  const [examineOrChallenge, setExamineOrChallenge] = useState("");
  const [consentContact, setConsentContact] = useState(false);
  const [consentAttribution, setConsentAttribution] = useState(false);

  useEffect(() => {
    if (preselectedDiscipline) {
      const match = DISCIPLINES.find((d) => d.id === preselectedDiscipline);
      if (match) {
        setDiscipline(match.id);
      } else if (preselectedDiscipline === "other") {
        setDiscipline("other");
      }
    }
  }, [preselectedDiscipline]);

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!name.trim()) errs.name = "Name is required.";
    else if (name.trim().length > 200) errs.name = "Name must be under 200 characters.";

    if (!email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = "Please enter a valid email address.";

    if (mode === "full") {
      if (!discipline) errs.discipline = "Please select a discipline.";

      if (!expertise.trim() || expertise.trim().length < 10)
        errs.expertise = "Please describe your relevant expertise (at least 10 characters).";
      else if (expertise.length > 2000)
        errs.expertise = "Expertise description must be under 2,000 characters.";

      if (!researchQuestions.trim() || researchQuestions.trim().length < 10)
        errs.researchQuestions =
          "Please describe your research questions of interest (at least 10 characters).";
      else if (researchQuestions.length > 2000)
        errs.researchQuestions = "Research questions must be under 2,000 characters.";

      if (contributionTypes.length === 0)
        errs.contributionTypes = "Select at least one contribution type.";

      if (profileUrl.trim() && !/^https?:\/\/.+/.test(profileUrl.trim()))
        errs.profileUrl = "Please enter a valid URL (starting with http:// or https://).";

      if (!examineOrChallenge.trim() || examineOrChallenge.trim().length < 10)
        errs.examineOrChallenge =
          "Please describe what you would examine, test, or challenge (at least 10 characters).";
      else if (examineOrChallenge.length > 2000)
        errs.examineOrChallenge = "Response must be under 2,000 characters.";

      if (!consentContact)
        errs.consentContact = "Consent to be contacted is required to submit an application.";
    }

    return errs;
  }

  function toggleContributionType(type: string) {
    setContributionTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const body =
        mode === "follow"
          ? { mode: "follow", name: name.trim(), email: email.trim() }
          : {
              mode: "full",
              name: name.trim(),
              email: email.trim(),
              discipline,
              professionalTitle: professionalTitle.trim(),
              institution: institution.trim(),
              expertise: expertise.trim(),
              researchQuestions: researchQuestions.trim(),
              contributionTypes,
              profileUrl: profileUrl.trim(),
              examineOrChallenge: examineOrChallenge.trim(),
              consentContact,
              consentAttribution,
            };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main id="main-content" className="flex-1">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="bg-gei-surface border border-gei-border rounded-xl p-10">
              <svg
                className="w-16 h-16 text-gei-cyan mx-auto mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-2xl font-bold mb-3">
                {mode === "follow" ? "You’re on the List" : "Application Received"}
              </h1>
              <p className="text-gei-text-muted mb-4">
                {mode === "follow"
                  ? "Thank you for your interest. We’ll keep you updated as the research progresses."
                  : "Thank you for your interest in contributing to the GEI Open Research Initiative. Your application has been received and is now under review."}
              </p>
              {mode === "full" && (
                <div className="bg-gei-near-black rounded-lg p-4 text-sm text-gei-text-muted text-left mt-6">
                  <p className="font-semibold text-gei-text mb-2">What happens next?</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Your application status is: <span className="text-gei-cyan font-medium">Received</span></li>
                    <li>The research team will review your application.</li>
                    <li>You will be contacted at the email you provided with a status update.</li>
                    <li>If accepted, you will receive access to the contributor workspace.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const disciplineLabel =
    DISCIPLINES.find((d) => d.id === discipline)?.title ??
    (discipline === "other" ? "Other / Interdisciplinary" : null);

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold">Apply to Contribute</h1>
            <p className="mt-3 text-gei-text-muted text-lg max-w-2xl">
              Express your interest in the GEI Open Research Initiative. No account is
              required to apply.
            </p>
            {disciplineLabel && (
              <p className="mt-2 text-sm">
                Preselected discipline:{" "}
                <span className="text-gei-cyan font-semibold">{disciplineLabel}</span>
              </p>
            )}
          </div>

          {/* Integrity notice */}
          <div className="bg-gei-surface border border-gei-border rounded-lg p-4 mb-8">
            <p className="text-xs text-gei-text-muted">
              <strong className="text-gei-text">Note:</strong> This application does not
              verify academic credentials or imply institutional endorsement. No
              institutional affiliation is required for an initial expression of interest.
              Contributions are evaluated on their merits and methodology.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-3 mb-8">
            <button
              type="button"
              onClick={() => setMode("full")}
              className={`flex-1 py-3 px-4 rounded-lg border text-sm font-semibold transition-colors ${
                mode === "full"
                  ? "border-gei-cyan bg-gei-cyan/10 text-gei-cyan"
                  : "border-gei-border text-gei-text-muted hover:border-gei-text-muted"
              }`}
            >
              Full Application
            </button>
            <button
              type="button"
              onClick={() => setMode("follow")}
              className={`flex-1 py-3 px-4 rounded-lg border text-sm font-semibold transition-colors ${
                mode === "follow"
                  ? "border-gei-cyan bg-gei-cyan/10 text-gei-cyan"
                  : "border-gei-border text-gei-text-muted hover:border-gei-text-muted"
              }`}
            >
              Follow the Research
            </button>
          </div>

          {mode === "follow" && (
            <p className="text-sm text-gei-text-muted mb-6">
              Not ready to contribute yet? Just leave your name and email to stay updated on
              the research initiative.
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {serverError && (
              <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
                {serverError}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Name / preferred display name <span className="text-gei-magenta">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={200}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email <span className="text-gei-magenta">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={254}
                required
                aria-invalid={!!errors.email}
                aria-describedby="email-note email-error"
              />
              <p id="email-note" className="mt-1 text-xs text-gei-text-muted">
                Your email will be kept private and used only for communication about your application.
              </p>
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {mode === "full" && (
              <>
                {/* Discipline */}
                <div>
                  <label htmlFor="discipline" className="block text-sm font-medium mb-1.5">
                    Primary discipline <span className="text-gei-magenta">*</span>
                  </label>
                  <select
                    id="discipline"
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    required
                    aria-invalid={!!errors.discipline}
                    aria-describedby={errors.discipline ? "discipline-error" : undefined}
                  >
                    <option value="">Select a discipline...</option>
                    {DISCIPLINES.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title} — {d.subtitle}
                      </option>
                    ))}
                    <option value="other">Other / Interdisciplinary</option>
                  </select>
                  {errors.discipline && (
                    <p id="discipline-error" className="mt-1 text-xs text-red-400">
                      {errors.discipline}
                    </p>
                  )}
                </div>

                {/* Professional title */}
                <div>
                  <label htmlFor="professionalTitle" className="block text-sm font-medium mb-1.5">
                    Professional title / area of study{" "}
                    <span className="text-gei-text-muted text-xs">(optional)</span>
                  </label>
                  <input
                    id="professionalTitle"
                    type="text"
                    value={professionalTitle}
                    onChange={(e) => setProfessionalTitle(e.target.value)}
                    maxLength={200}
                  />
                </div>

                {/* Institution */}
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium mb-1.5">
                    Institution / organization{" "}
                    <span className="text-gei-text-muted text-xs">(optional)</span>
                  </label>
                  <input
                    id="institution"
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    maxLength={200}
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium mb-1.5">
                    Relevant expertise <span className="text-gei-magenta">*</span>
                  </label>
                  <textarea
                    id="expertise"
                    rows={4}
                    value={expertise}
                    onChange={(e) => setExpertise(e.target.value)}
                    maxLength={2000}
                    required
                    placeholder="Describe your background, skills, and experience relevant to GEI research..."
                    aria-invalid={!!errors.expertise}
                    aria-describedby={errors.expertise ? "expertise-error" : undefined}
                  />
                  <p className="mt-1 text-xs text-gei-text-muted text-right">
                    {expertise.length}/2,000
                  </p>
                  {errors.expertise && (
                    <p id="expertise-error" className="mt-1 text-xs text-red-400">
                      {errors.expertise}
                    </p>
                  )}
                </div>

                {/* Research questions */}
                <div>
                  <label htmlFor="researchQuestions" className="block text-sm font-medium mb-1.5">
                    GEI research question(s) of interest <span className="text-gei-magenta">*</span>
                  </label>
                  <textarea
                    id="researchQuestions"
                    rows={4}
                    value={researchQuestions}
                    onChange={(e) => setResearchQuestions(e.target.value)}
                    maxLength={2000}
                    required
                    placeholder="What questions about GEI interest you most?"
                    aria-invalid={!!errors.researchQuestions}
                    aria-describedby={errors.researchQuestions ? "researchQuestions-error" : undefined}
                  />
                  <p className="mt-1 text-xs text-gei-text-muted text-right">
                    {researchQuestions.length}/2,000
                  </p>
                  {errors.researchQuestions && (
                    <p id="researchQuestions-error" className="mt-1 text-xs text-red-400">
                      {errors.researchQuestions}
                    </p>
                  )}
                </div>

                {/* Contribution types */}
                <fieldset>
                  <legend className="block text-sm font-medium mb-2">
                    Contribution type <span className="text-gei-magenta">*</span>
                    <span className="block text-xs text-gei-text-muted font-normal mt-0.5">
                      Select all that apply.
                    </span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CONTRIBUTION_TYPES.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gei-border hover:border-gei-cyan/40 transition-colors cursor-pointer text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={contributionTypes.includes(type)}
                          onChange={() => toggleContributionType(type)}
                          className="accent-gei-cyan w-4 h-4"
                        />
                        <span className="text-gei-text">{type}</span>
                      </label>
                    ))}
                  </div>
                  {errors.contributionTypes && (
                    <p className="mt-1 text-xs text-red-400">{errors.contributionTypes}</p>
                  )}
                </fieldset>

                {/* Profile URL */}
                <div>
                  <label htmlFor="profileUrl" className="block text-sm font-medium mb-1.5">
                    Website / ORCID / professional profile{" "}
                    <span className="text-gei-text-muted text-xs">(optional)</span>
                  </label>
                  <input
                    id="profileUrl"
                    type="url"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    maxLength={500}
                    placeholder="https://"
                    aria-invalid={!!errors.profileUrl}
                    aria-describedby={errors.profileUrl ? "profileUrl-error" : undefined}
                  />
                  {errors.profileUrl && (
                    <p id="profileUrl-error" className="mt-1 text-xs text-red-400">
                      {errors.profileUrl}
                    </p>
                  )}
                </div>

                {/* Examine or challenge */}
                <div>
                  <label htmlFor="examineOrChallenge" className="block text-sm font-medium mb-1.5">
                    What would you examine, test, or challenge?{" "}
                    <span className="text-gei-magenta">*</span>
                  </label>
                  <textarea
                    id="examineOrChallenge"
                    rows={4}
                    value={examineOrChallenge}
                    onChange={(e) => setExamineOrChallenge(e.target.value)}
                    maxLength={2000}
                    required
                    placeholder="Describe the specific aspect of GEI you would investigate or challenge..."
                    aria-invalid={!!errors.examineOrChallenge}
                    aria-describedby={
                      errors.examineOrChallenge ? "examineOrChallenge-error" : undefined
                    }
                  />
                  <p className="mt-1 text-xs text-gei-text-muted text-right">
                    {examineOrChallenge.length}/2,000
                  </p>
                  {errors.examineOrChallenge && (
                    <p id="examineOrChallenge-error" className="mt-1 text-xs text-red-400">
                      {errors.examineOrChallenge}
                    </p>
                  )}
                </div>

                {/* Consent: contact */}
                <div className="space-y-3 border-t border-gei-border pt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentContact}
                      onChange={(e) => setConsentContact(e.target.checked)}
                      className="accent-gei-cyan w-4 h-4 mt-0.5"
                      required
                    />
                    <span className="text-sm">
                      I consent to be contacted about my application and the GEI research
                      initiative. <span className="text-gei-magenta">*</span>
                    </span>
                  </label>
                  {errors.consentContact && (
                    <p className="text-xs text-red-400 ml-7">{errors.consentContact}</p>
                  )}

                  {/* Consent: attribution */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentAttribution}
                      onChange={(e) => setConsentAttribution(e.target.checked)}
                      className="accent-gei-cyan w-4 h-4 mt-0.5"
                    />
                    <span className="text-sm text-gei-text-muted">
                      I consent to public attribution of my contributions (name and/or
                      affiliation may appear alongside published work). This is optional and
                      can be changed later.
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 bg-gei-cyan text-gei-near-black font-bold rounded-lg hover:bg-gei-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting
                  ? "Submitting..."
                  : mode === "follow"
                    ? "Follow the Research"
                    : "Submit Application"}
              </button>
            </div>
          </form>

          {/* Privacy note */}
          <div className="mt-8 p-4 bg-gei-surface/50 border border-gei-border rounded-lg">
            <p className="text-xs text-gei-text-muted">
              <strong className="text-gei-text">Privacy:</strong> Your email and personal
              information will be kept private. We do not collect date of birth, home
              address, phone number, government ID, or other unnecessary sensitive data. You
              may request account deletion at any time. See our{" "}
              <a href="/privacy" className="text-gei-cyan hover:underline">
                Privacy Notice
              </a>{" "}
              for details.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-screen">
          <p className="text-gei-text-muted">Loading application form...</p>
        </div>
      }
    >
      <ApplicationFormInner />
    </Suspense>
  );
}
