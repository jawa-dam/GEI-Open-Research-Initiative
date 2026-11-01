import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gei-near-black border-t border-gei-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-gei-cyan font-bold text-lg mb-3">
              GEI Open Research Initiative
            </h3>
            <p className="text-sm text-gei-text-muted leading-relaxed">
              Six disciplines. One open investigation. Examining an alternative
              reading of Genesis 1–6 through rigorous, transparent research.
            </p>
          </div>

          {/* Research */}
          <div>
            <h4 className="text-gei-text font-semibold text-sm uppercase tracking-wider mb-3">
              Research
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/research" className="text-gei-text-muted hover:text-gei-cyan transition-colors">
                  Evidence Room
                </Link>
              </li>
              <li>
                <Link href="/disciplines" className="text-gei-text-muted hover:text-gei-cyan transition-colors">
                  Disciplines
                </Link>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.zenodo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gei-text-muted hover:text-gei-cyan transition-colors"
                >
                  GEI Publication (Zenodo)
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gei-text-muted hover:text-gei-cyan transition-colors"
                >
                  DOI Record
                </a>
              </li>
            </ul>
          </div>

          {/* Participate */}
          <div>
            <h4 className="text-gei-text font-semibold text-sm uppercase tracking-wider mb-3">
              Participate
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/apply" className="text-gei-text-muted hover:text-gei-cyan transition-colors">
                  Apply to Contribute
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-gei-text-muted hover:text-gei-cyan transition-colors">
                  Researcher Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-gei-text font-semibold text-sm uppercase tracking-wider mb-3">
              About
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={EXTERNAL_LINKS.yalltoo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gei-text-muted hover:text-gei-cyan transition-colors"
                >
                  Y&apos;allToo
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gei-text-muted hover:text-gei-cyan transition-colors"
                >
                  ORCID Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gei-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gei-text-muted text-center sm:text-left">
              &copy; {new Date().getFullYear()} Y&apos;allToo / Genesis Engineered
              Interpretation. Research lead: Wilbert Bouie Jr.
            </p>
            <p className="text-xs text-gei-text-muted text-center sm:text-right max-w-md">
              GEI is a research hypothesis under investigation. It is not
              presented as academic consensus, an established Hebrew translation,
              or confirmed archaeological discovery.
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gei-text-muted">
              This application does not verify academic credentials or imply
              institutional endorsement. See our{" "}
              <Link href="/privacy" className="text-gei-cyan hover:underline">
                Privacy Notice
              </Link>{" "}
              for data practices.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
