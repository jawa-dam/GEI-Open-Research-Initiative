import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RESEARCH_ENTRIES } from "@/lib/research-entries";
import { EXTERNAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Evidence Room",
  description:
    "Public research library for the GEI Open Research Initiative. Transparent starter records examining Genesis 1–6 through linguistic, textual, hydraulic, archaeological, and mechanical-engineering lenses.",
  robots: { index: true, follow: true },
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group border-t border-gei-border">
      <summary className="flex items-center justify-between px-5 py-3 cursor-pointer list-none text-sm font-semibold text-gei-text hover:text-gei-cyan transition-colors">
        {label}
        <svg
          className="w-4 h-4 text-gei-text-muted group-open:rotate-180 transition-transform shrink-0 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <div className="px-5 pb-4 text-sm text-gei-text-muted leading-relaxed">{children}</div>
    </details>
  );
}

function TagList({ items }: { items: string[] }) {
  if (items.length === 0) return <span className="italic">Not yet supplied</span>;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="bg-gei-near-black border border-gei-border rounded px-2 py-0.5 text-xs text-gei-text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Page header */}
        <section className="border-b border-gei-border bg-gei-surface/50 blueprint-grid">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">Evidence Room</h1>
            <p className="text-lg text-gei-text-muted max-w-2xl leading-relaxed">
              A transparent research library — not finished scholarship. Each entry documents a
              question, the conventional reading, the GEI proposal, available evidence,
              counterarguments, and what would be needed to test the claim.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href={EXTERNAL_LINKS.zenodo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-gei-blue text-white font-semibold rounded-lg hover:bg-gei-blue/90 transition-colors text-sm"
              >
                GEI Publication on Zenodo
              </a>
              <a
                href={EXTERNAL_LINKS.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-gei-text-muted hover:text-gei-cyan transition-colors"
              >
                DOI: 10.5281/zenodo.17316845
              </a>
            </div>
          </div>
        </section>

        {/* Integrity notice */}
        <section className="bg-gei-surface border-b border-gei-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gei-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className="text-xs text-gei-text-muted leading-relaxed">
                <strong className="text-gei-text">Transparency note:</strong> These are starter
                records, not fabricated finished scholarship. Content marked{" "}
                <em>&quot;not yet supplied&quot;</em> is genuinely absent — it has not been invented or
                filled with placeholder data. Citations are never fabricated. Review states reflect
                the actual status of each entry.
              </p>
            </div>
          </div>
        </section>

        {/* Quick-jump nav */}
        <section className="border-b border-gei-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-3">
            <span className="text-xs text-gei-text-muted font-semibold uppercase tracking-wider self-center">
              Jump to:
            </span>
            {RESEARCH_ENTRIES.map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className="text-xs font-mono bg-gei-cyan/10 text-gei-cyan px-2.5 py-1 rounded hover:bg-gei-cyan/20 transition-colors"
              >
                {entry.code}
              </a>
            ))}
          </div>
        </section>

        {/* Research entries */}
        <section className="py-10 sm:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {RESEARCH_ENTRIES.map((entry) => (
              <article
                key={entry.id}
                id={entry.id}
                className="bg-gei-surface border border-gei-border rounded-xl overflow-hidden scroll-mt-20"
              >
                {/* Review-state banner */}
                <div className="bg-gei-near-black border-b border-gei-border px-5 py-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-gei-cyan/10 text-gei-cyan px-2 py-0.5 rounded">
                      {entry.code}
                    </span>
                    <span className="text-xs text-gei-text-muted">{entry.category}</span>
                  </div>
                  <span className="status-badge bg-yellow-900/40 text-yellow-400 border border-yellow-700/50">
                    {entry.reviewState}
                  </span>
                </div>

                {/* Title & core question */}
                <div className="px-5 pt-5 pb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gei-text mb-3">
                    {entry.title}
                  </h2>
                  <div className="bg-gei-near-black border border-gei-border rounded-lg p-4 mb-4">
                    <p className="text-xs uppercase tracking-wider text-gei-magenta font-semibold mb-1">
                      Core Question
                    </p>
                    <p className="text-sm text-gei-text leading-relaxed">{entry.question}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-xs uppercase tracking-wider text-gei-text-muted font-semibold mb-1">
                      Scope
                    </p>
                    <p className="text-sm text-gei-text-muted leading-relaxed">{entry.scope}</p>
                  </div>
                </div>

                {/* Biblical passages & source-language refs */}
                <Section label="Biblical Passages">
                  <TagList items={entry.biblicalPassages} />
                </Section>

                <Section label="Source-Language References">
                  {entry.sourceLanguageRefs.length === 0 ? (
                    <p className="italic">Not yet supplied</p>
                  ) : (
                    <ul className="space-y-1">
                      {entry.sourceLanguageRefs.map((ref, i) => (
                        <li key={i} className="font-mono text-xs bg-gei-near-black border border-gei-border rounded px-3 py-1.5">
                          {ref}
                        </li>
                      ))}
                    </ul>
                  )}
                </Section>

                {/* Readings & proposal */}
                <Section label="Conventional Reading">
                  <p>{entry.conventionalReading}</p>
                </Section>

                <Section label="Alternative Reading (GEI)">
                  <p>{entry.alternativeReading}</p>
                </Section>

                <Section label="GEI Proposal">
                  <p>{entry.geiProposal}</p>
                </Section>

                {/* Evidence & counterarguments */}
                <Section label="Evidence">
                  <p>{entry.evidence}</p>
                </Section>

                <Section label="Counterarguments">
                  <p>{entry.counterarguments}</p>
                </Section>

                <Section label="Test / Weakening Criteria">
                  <p>{entry.testCriteria}</p>
                </Section>

                {/* Bibliography */}
                <Section label="Bibliography">
                  {entry.bibliography.length === 0 ? (
                    <p className="italic">Not yet supplied</p>
                  ) : (
                    <ol className="list-decimal list-inside space-y-1">
                      {entry.bibliography.map((cite, i) => (
                        <li key={i}>{cite}</li>
                      ))}
                    </ol>
                  )}
                </Section>

                {/* Version & date */}
                <div className="border-t border-gei-border px-5 py-3 flex flex-wrap items-center gap-4 text-xs text-gei-text-muted">
                  <span>
                    <strong className="text-gei-text">Version:</strong> {entry.version}
                  </span>
                  <span>
                    <strong className="text-gei-text">Last updated:</strong> {entry.lastUpdated}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-gei-border bg-gei-surface/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Can You Strengthen — or Challenge — This Research?</h2>
            <p className="text-gei-text-muted mb-6 text-sm">
              Every entry has open questions. If your expertise can sharpen the evidence,
              identify a flaw, or supply what&apos;s missing, the investigation needs you.
            </p>
            <a
              href="/apply"
              className="inline-flex items-center justify-center px-6 py-3 bg-gei-cyan text-gei-near-black font-bold rounded-lg hover:bg-gei-cyan/90 transition-colors"
            >
              APPLY TO CONTRIBUTE
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
