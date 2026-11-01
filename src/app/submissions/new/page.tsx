"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  SUBMISSION_TYPES,
  DISCIPLINES,
  ATTRIBUTION_CHOICES,
} from "@/lib/constants";

type FormState = "idle" | "submitting" | "success" | "error";

export default function NewSubmissionPage() {
  const [form, setForm] = useState({
    type: "" as string,
    title: "",
    discipline: "",
    abstract: "",
    content: "",
    biblicalPassages: "",
    sourceLanguageRefs: "",
    bibliography: "",
    attribution: "anonymous" as string,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState("");

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.type) errs.type = "Please select a submission type";
    if (form.title.length < 5)
      errs.title = "Title must be at least 5 characters";
    if (form.title.length > 300)
      errs.title = "Title must be under 300 characters";
    if (!form.discipline) errs.discipline = "Please select a discipline";
    if (form.content.length < 50)
      errs.content = "Content must be at least 50 characters";
    if (form.content.length > 50000)
      errs.content = "Content must be under 50,000 characters";
    if (!form.attribution) errs.attribution = "Please select an attribution choice";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setState("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState("success");
      } else if (res.status === 401) {
        window.location.href = "/sign-in";
      } else {
        const data = await res.json();
        setServerError(data.error || "Submission failed. Please try again.");
        setState("error");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <>
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="max-w-md text-center">
            <svg
              className="w-16 h-16 text-green-400 mx-auto mb-4"
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
            <h1 className="text-2xl font-bold mb-2">Submission Created</h1>
            <p className="text-gei-text-muted mb-6">
              Your submission has been saved as a draft. You can submit it for
              review from your submissions page.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/submissions"
                className="px-5 py-2.5 bg-gei-cyan text-gei-near-black font-semibold rounded-lg hover:bg-gei-cyan/90 transition-colors"
              >
                View Submissions
              </Link>
              <button
                onClick={() => {
                  setForm({
                    type: "",
                    title: "",
                    discipline: "",
                    abstract: "",
                    content: "",
                    biblicalPassages: "",
                    sourceLanguageRefs: "",
                    bibliography: "",
                    attribution: "anonymous",
                  });
                  setState("idle");
                }}
                className="px-5 py-2.5 border border-gei-border text-gei-text rounded-lg hover:bg-gei-surface transition-colors"
              >
                Create Another
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link
              href="/submissions"
              className="text-sm text-gei-text-muted hover:text-gei-cyan transition-colors mb-2 inline-block"
            >
              &larr; Back to Submissions
            </Link>
            <h1 className="text-3xl font-bold">New Submission</h1>
            <p className="mt-1 text-gei-text-muted">
              Submit a research contribution to the GEI initiative
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 bg-gei-surface border border-gei-border rounded-xl p-6 sm:p-8"
          >
            {serverError && (
              <div
                className="bg-red-900/20 border border-red-700/30 rounded-lg p-3"
                role="alert"
              >
                <p className="text-sm text-red-400">{serverError}</p>
              </div>
            )}

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Submission Type <span className="text-red-400">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                aria-invalid={!!errors.type}
                aria-describedby={errors.type ? "type-error" : undefined}
              >
                <option value="">Select a type...</option>
                {SUBMISSION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p id="type-error" className="text-xs text-red-400 mt-1">
                  {errors.type}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Title <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                maxLength={300}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              <div className="flex justify-between mt-1">
                {errors.title ? (
                  <p id="title-error" className="text-xs text-red-400">
                    {errors.title}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gei-text-muted">
                  {form.title.length}/300
                </span>
              </div>
            </div>

            {/* Discipline */}
            <div>
              <label
                htmlFor="discipline"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Discipline <span className="text-red-400">*</span>
              </label>
              <select
                id="discipline"
                name="discipline"
                value={form.discipline}
                onChange={handleChange}
                aria-invalid={!!errors.discipline}
                aria-describedby={
                  errors.discipline ? "discipline-error" : undefined
                }
              >
                <option value="">Select a discipline...</option>
                {DISCIPLINES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
                <option value="other">Other / Interdisciplinary</option>
              </select>
              {errors.discipline && (
                <p id="discipline-error" className="text-xs text-red-400 mt-1">
                  {errors.discipline}
                </p>
              )}
            </div>

            {/* Abstract */}
            <div>
              <label
                htmlFor="abstract"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Abstract{" "}
                <span className="text-gei-text-muted font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                id="abstract"
                name="abstract"
                rows={3}
                value={form.abstract}
                onChange={handleChange}
                maxLength={1000}
                placeholder="Brief summary of your submission..."
              />
              <p className="text-xs text-gei-text-muted mt-1 text-right">
                {form.abstract.length}/1,000
              </p>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Content <span className="text-red-400">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows={12}
                value={form.content}
                onChange={handleChange}
                maxLength={50000}
                placeholder="Your full submission content..."
                aria-invalid={!!errors.content}
                aria-describedby={errors.content ? "content-error" : undefined}
              />
              <div className="flex justify-between mt-1">
                {errors.content ? (
                  <p id="content-error" className="text-xs text-red-400">
                    {errors.content}
                  </p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gei-text-muted">
                  {form.content.length.toLocaleString()}/50,000
                </span>
              </div>
            </div>

            {/* Biblical Passages */}
            <div>
              <label
                htmlFor="biblicalPassages"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Biblical Passages{" "}
                <span className="text-gei-text-muted font-normal">
                  (optional)
                </span>
              </label>
              <input
                id="biblicalPassages"
                name="biblicalPassages"
                type="text"
                value={form.biblicalPassages}
                onChange={handleChange}
                maxLength={500}
                placeholder="e.g. Genesis 1:1–2:3, Genesis 2:7"
              />
            </div>

            {/* Source Language References */}
            <div>
              <label
                htmlFor="sourceLanguageRefs"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Source Language References{" "}
                <span className="text-gei-text-muted font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                id="sourceLanguageRefs"
                name="sourceLanguageRefs"
                rows={2}
                value={form.sourceLanguageRefs}
                onChange={handleChange}
                maxLength={1000}
                placeholder="Hebrew terms, transliterations, or references..."
              />
            </div>

            {/* Bibliography */}
            <div>
              <label
                htmlFor="bibliography"
                className="block text-sm font-medium text-gei-text mb-1"
              >
                Bibliography{" "}
                <span className="text-gei-text-muted font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                id="bibliography"
                name="bibliography"
                rows={3}
                value={form.bibliography}
                onChange={handleChange}
                maxLength={5000}
                placeholder="References and citations..."
              />
            </div>

            {/* Attribution */}
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gei-text mb-2">
                  Attribution Preference{" "}
                  <span className="text-red-400">*</span>
                </legend>
                <div className="space-y-2">
                  {ATTRIBUTION_CHOICES.map((choice) => (
                    <label
                      key={choice}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="attribution"
                        value={choice}
                        checked={form.attribution === choice}
                        onChange={handleChange}
                        className="mt-1 accent-[var(--gei-cyan)]"
                      />
                      <div>
                        <span className="text-sm text-gei-text capitalize">
                          {choice.replace(/_/g, " ")}
                        </span>
                        <p className="text-xs text-gei-text-muted">
                          {choice === "named" &&
                            "Your name will be displayed with this submission."}
                          {choice === "affiliation_shown" &&
                            "Your name and institutional affiliation will be displayed."}
                          {choice === "anonymous" &&
                            "Your submission will be attributed anonymously."}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.attribution && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.attribution}
                  </p>
                )}
              </fieldset>
              <p className="text-xs text-gei-text-muted mt-2">
                Attribution requires your explicit consent. Contact details are
                never published. You can change your preference before
                publication.
              </p>
            </div>

            {/* Notices */}
            <div className="bg-gei-near-black border border-gei-border rounded-lg p-4 text-xs text-gei-text-muted space-y-2">
              <p>
                Submissions are initially saved as drafts. Submit for review
                from your submissions page when ready. Contributions are
                evaluated on their merits and methodology.
              </p>
              <p>
                This initiative does not promise peer review, academic
                certification, employment, compensation, or formal
                institutional affiliation.
              </p>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={state === "submitting"}
                className="px-6 py-3 bg-gei-cyan text-gei-near-black font-semibold rounded-lg hover:bg-gei-cyan/90 transition-colors disabled:opacity-50"
              >
                {state === "submitting"
                  ? "Saving..."
                  : "Save as Draft"}
              </button>
              <Link
                href="/submissions"
                className="px-6 py-3 border border-gei-border text-gei-text text-center rounded-lg hover:bg-gei-surface-light transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
