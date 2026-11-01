import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { DISCIPLINES, EXTERNAL_LINKS } from "@/lib/constants";

const DISCIPLINE_ICONS: Record<string, React.ReactNode> = {
  scroll: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  book: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  building: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  ),
  droplets: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  pickaxe: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  cog: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const FAQ = [
  {
    q: "What is GEI?",
    a: "Genesis Engineered Interpretation (GEI) is an alternative interpretive framework that examines Genesis 1–6 through proposed linguistic, textual, hydraulic, archaeological, and mechanical-engineering comparisons. It is a research hypothesis, not an established academic position.",
  },
  {
    q: "Do I need academic credentials to participate?",
    a: "No institutional affiliation or formal credentials are required to express interest. We welcome independent researchers, professionals, students, and curious minds. However, technical contributions will be evaluated on their merits and methodology.",
  },
  {
    q: "Is GEI claiming to be proven science?",
    a: "No. GEI distinguishes between observations, analogies, hypotheses, and evidence. The initiative exists specifically to invite critical examination — agreement is not required or expected.",
  },
  {
    q: "What happens after I apply?",
    a: "Applications are reviewed by the research team. You’ll receive a status update and, if accepted, access to the contributor workspace where you can submit analyses, questions, critiques, and references.",
  },
  {
    q: "Can I just follow the research without contributing?",
    a: 'Yes. The Evidence Room and research library are publicly accessible. You can also select a "follow the research" option when expressing interest.',
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden blueprint-grid">
          <div className="flow-lines relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
              <div className="max-w-3xl">
                <div className="mb-6">
                  <Logo size="lg" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="gradient-text">A DAM TEAM OF GENIUS.</span>
                </h1>
                <p className="mt-4 text-xl sm:text-2xl text-gei-cyan font-medium">
                  Six disciplines. One open investigation.
                </p>
                <p className="mt-6 text-lg text-gei-text-muted leading-relaxed max-w-2xl">
                  GEI invites Hebrew scholars, biblical researchers, engineers,
                  hydrologists, archaeologists, and mechanical engineers to examine an
                  alternative reading of Genesis 1–6. Bring your expertise. Challenge
                  the model. Help us document what the evidence does — and does
                  not — support.
                </p>
                <p className="mt-4 text-sm text-gei-text-muted italic">
                  You bring the expertise. We&apos;ll bring the blueprint.
                  Challenge the blueprint. Agreement is not required.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/research"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gei-cyan text-gei-near-black font-bold rounded-lg hover:bg-gei-cyan/90 transition-colors text-base"
                  >
                    EXPLORE THE RESEARCH
                  </Link>
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-gei-cyan text-gei-cyan font-bold rounded-lg hover:bg-gei-cyan/10 transition-colors text-base"
                  >
                    APPLY TO CONTRIBUTE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrity Notice */}
        <section className="bg-gei-surface border-y border-gei-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gei-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <p className="text-sm text-gei-text-muted">
                <strong className="text-gei-text">Research integrity notice:</strong>{" "}
                GEI is not presented as academic consensus, an established Hebrew
                translation, proven ancient hydraulic technology, or confirmed
                archaeological discovery. This initiative distinguishes observation,
                analogy, hypothesis, evidence, and unresolved questions. Critical
                review and corrections are invited.
              </p>
            </div>
          </div>
        </section>

        {/* Six Disciplines */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Six Disciplines, One Investigation
              </h2>
              <p className="mt-3 text-gei-text-muted text-lg max-w-2xl mx-auto">
                Each pathway invites domain expertise to examine a specific
                dimension of the GEI framework.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DISCIPLINES.map((d) => (
                <Link
                  key={d.id}
                  href={`/apply?discipline=${d.id}`}
                  className="discipline-card group block bg-gei-surface border border-gei-border rounded-xl p-6 hover:border-gei-cyan/50"
                >
                  <div className="text-gei-cyan mb-4">
                    {DISCIPLINE_ICONS[d.icon]}
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gei-magenta mb-1">
                    {d.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-gei-text mb-3">
                    {d.title}
                  </h3>
                  <p className="text-sm text-gei-text-muted leading-relaxed mb-4">
                    {d.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-gei-cyan group-hover:underline">
                    {d.cta}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/apply?discipline=other"
                className="text-gei-text-muted hover:text-gei-cyan text-sm transition-colors"
              >
                Other / Interdisciplinary contributions are also welcome →
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gei-surface/50 border-y border-gei-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Explore",
                  desc: "Browse the public Evidence Room. Read the research entries, claims, and open questions.",
                },
                {
                  step: "02",
                  title: "Apply",
                  desc: "Express your interest and select your discipline. No credentials required for initial expression of interest.",
                },
                {
                  step: "03",
                  title: "Contribute",
                  desc: "Submit questions, critiques, analyses, source references, or corrections through the researcher workspace.",
                },
                {
                  step: "04",
                  title: "Review",
                  desc: "Contributions are reviewed for rigor and relevance. Published work documents what the evidence does and does not support.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gei-cyan/10 text-gei-cyan font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gei-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Preview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Research Preview</h2>
              <p className="mt-3 text-gei-text-muted max-w-xl mx-auto">
                Current investigation threads in the Evidence Room
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { code: "GEI-01", title: "The Adam / A-DAM Hypothesis", cat: "Linguistic Question" },
                { code: "GEI-02", title: "Genesis 1–6 Textual Mapping", cat: "Textual Analysis" },
                { code: "GEI-03", title: "Mountain-to-Ocean Hydraulic Model", cat: "Engineering Hypothesis" },
                { code: "GEI-04", title: "Claims, Evidence & Open Questions", cat: "Research Status Overview" },
              ].map((entry) => (
                <Link
                  key={entry.code}
                  href={`/research#${entry.code.toLowerCase()}`}
                  className="block bg-gei-surface border border-gei-border rounded-lg p-5 hover:border-gei-cyan/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono bg-gei-cyan/10 text-gei-cyan px-2 py-0.5 rounded">
                      {entry.code}
                    </span>
                    <span className="text-xs text-gei-text-muted">{entry.cat}</span>
                  </div>
                  <h3 className="font-semibold text-gei-text">{entry.title}</h3>
                  <p className="text-xs text-gei-text-muted mt-1">
                    Awaiting expert review
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/research"
                className="inline-flex items-center text-gei-cyan hover:underline font-medium"
              >
                View full Evidence Room
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Publication */}
        <section className="py-12 bg-gei-surface/50 border-y border-gei-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Published Source</h2>
            <p className="text-gei-text-muted mb-6">
              The foundational GEI document is publicly available for review and citation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={EXTERNAL_LINKS.zenodo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 bg-gei-blue text-white font-semibold rounded-lg hover:bg-gei-blue/90 transition-colors"
              >
                View on Zenodo
              </a>
              <a
                href={EXTERNAL_LINKS.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gei-text-muted hover:text-gei-cyan transition-colors"
              >
                DOI: 10.5281/zenodo.17316845
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQ.map((item, i) => (
                <details
                  key={i}
                  className="group bg-gei-surface border border-gei-border rounded-lg overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-gei-text hover:text-gei-cyan transition-colors">
                    {item.q}
                    <svg
                      className="w-5 h-5 text-gei-text-muted group-open:rotate-180 transition-transform shrink-0 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gei-text-muted leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-gei-blue/20 via-gei-cyan/10 to-gei-magenta/20 border-t border-gei-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Investigation</h2>
            <p className="text-gei-text-muted mb-8 max-w-xl mx-auto">
              Whether you&apos;re a Hebrew scholar, engineer, archaeologist, or curious
              researcher — your expertise matters. Help document what the
              evidence supports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 bg-gei-cyan text-gei-near-black font-bold rounded-lg hover:bg-gei-cyan/90 transition-colors"
              >
                APPLY TO CONTRIBUTE
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center px-6 py-3 border border-gei-border text-gei-text font-medium rounded-lg hover:bg-gei-surface transition-colors"
              >
                Browse the Evidence Room
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
