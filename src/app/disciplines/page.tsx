import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DISCIPLINES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disciplines",
  description:
    "Six research pathways examining Genesis 1–6 through linguistics, textual analysis, civil engineering, hydrology, archaeology, and mechanical engineering.",
};

const DISCIPLINE_ICONS: Record<string, React.ReactNode> = {
  scroll: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  book: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  building: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  ),
  droplets: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  pickaxe: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  cog: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export default function DisciplinesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {/* Page header */}
        <section className="blueprint-grid border-b border-gei-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="gradient-text">Research Pathways</span>
            </h1>
            <p className="mt-4 text-lg text-gei-text-muted max-w-2xl leading-relaxed">
              GEI spans six disciplines, each essential to a rigorous examination
              of the framework. Select a pathway that matches your expertise — or
              propose an interdisciplinary contribution.
            </p>
            <p className="mt-3 text-sm text-gei-text-muted italic">
              Agreement is not required. Critical review and corrections are
              invited.
            </p>
          </div>
        </section>

        {/* Discipline sections */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {DISCIPLINES.map((d, i) => (
              <article
                key={d.id}
                id={d.id}
                className="bg-gei-surface border border-gei-border rounded-xl p-6 sm:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="text-gei-cyan shrink-0 hidden sm:block">
                    {DISCIPLINE_ICONS[d.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gei-magenta mb-1">
                      {d.subtitle}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gei-text mb-1">
                      <span className="text-gei-text-muted font-mono text-base mr-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {d.title}
                    </h2>

                    <p className="mt-4 text-gei-text-muted leading-relaxed">
                      {d.description}
                    </p>

                    {d.note && (
                      <div className="mt-4 flex items-start gap-2 bg-gei-near-black/50 border border-gei-border rounded-lg p-4">
                        <svg
                          className="w-5 h-5 text-gei-cyan mt-0.5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>
                        <p className="text-sm text-gei-text-muted italic">
                          {d.note}
                        </p>
                      </div>
                    )}

                    <div className="mt-6">
                      <Link
                        href={`/apply?discipline=${d.id}`}
                        className="inline-flex items-center px-5 py-2.5 bg-gei-cyan text-gei-near-black font-bold rounded-lg hover:bg-gei-cyan/90 transition-colors text-sm"
                      >
                        {d.cta}
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Other / Interdisciplinary */}
            <article
              id="other"
              className="bg-gei-surface border border-dashed border-gei-border rounded-xl p-6 sm:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="text-gei-cyan shrink-0 hidden sm:block">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gei-magenta mb-1">
                    INTERDISCIPLINARY
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gei-text mb-1">
                    <span className="text-gei-text-muted font-mono text-base mr-2">
                      07
                    </span>
                    Other / Interdisciplinary
                  </h2>

                  <p className="mt-4 text-gei-text-muted leading-relaxed">
                    GEI touches questions that cross disciplinary boundaries. If
                    your expertise spans multiple fields listed above, or if you
                    bring a perspective from a discipline not listed — history of
                    science, philosophy of interpretation, ancient Near Eastern
                    studies, geology, comparative religion, or another relevant
                    area — we welcome your contribution. Describe your background
                    and the angle you would bring in your application.
                  </p>

                  <div className="mt-6">
                    <Link
                      href="/apply?discipline=other"
                      className="inline-flex items-center px-5 py-2.5 border-2 border-gei-cyan text-gei-cyan font-bold rounded-lg hover:bg-gei-cyan/10 transition-colors text-sm"
                    >
                      PROPOSE YOUR ANGLE
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Bottom note */}
        <section className="bg-gei-surface/50 border-t border-gei-border py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gei-text-muted leading-relaxed">
              This application does not verify academic credentials or imply
              institutional endorsement. Contributions are evaluated on
              methodology, rigor, and relevance. GEI does not promise peer
              review, academic certification, employment, compensation, or formal
              institutional affiliation.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
