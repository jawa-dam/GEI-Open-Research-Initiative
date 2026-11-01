"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

interface HeaderProps {
  user?: {
    name: string;
    role: string;
  } | null;
}

const publicNav = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Evidence Room" },
  { href: "/disciplines", label: "Disciplines" },
  { href: "/apply", label: "Apply" },
];

const memberNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/submissions", label: "Submissions" },
  { href: "/profile", label: "Profile" },
];

const reviewerNav = [{ href: "/review", label: "Review Queue" }];

const adminNav = [{ href: "/admin", label: "Admin" }];

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    ...publicNav,
    ...(user ? memberNav : []),
    ...(user?.role === "reviewer" || user?.role === "admin" ? reviewerNav : []),
    ...(user?.role === "admin" ? adminNav : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-gei-near-black/95 backdrop-blur border-b border-gei-border">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gei-cyan font-bold text-lg tracking-tight"
          >
            <Logo size="sm" />
            <span>
              GEI<span className="text-gei-text-muted font-normal ml-1 hidden sm:inline">Research</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-gei-cyan bg-gei-surface"
                    : "text-gei-text-muted hover:text-gei-text hover:bg-gei-surface-light"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gei-text-muted">{user.name}</span>
                <Link
                  href="/api/auth/signout"
                  className="text-sm text-gei-text-muted hover:text-gei-text transition-colors"
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm text-gei-text-muted hover:text-gei-text transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 bg-gei-cyan text-gei-near-black text-sm font-semibold rounded-md hover:bg-gei-cyan/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gei-text-muted hover:text-gei-text"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-gei-border mt-2 pt-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? "text-gei-cyan bg-gei-surface"
                    : "text-gei-text-muted hover:text-gei-text"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-gei-border">
              {user ? (
                <Link
                  href="/api/auth/signout"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gei-text-muted"
                >
                  Sign Out ({user.name})
                </Link>
              ) : (
                <div className="flex flex-col gap-2 px-3">
                  <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="text-sm text-gei-text-muted">
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="text-center px-4 py-2 bg-gei-cyan text-gei-near-black text-sm font-semibold rounded-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
