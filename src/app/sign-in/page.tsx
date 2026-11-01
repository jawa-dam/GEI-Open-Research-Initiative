"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("dev-credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDevAuth = process.env.NEXT_PUBLIC_DEV_AUTH === "true";

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Researcher Sign In</h1>
            <p className="mt-2 text-gei-text-muted">
              Access your contributor workspace
            </p>
          </div>

          {!isDevAuth ? (
            <div className="bg-gei-surface border border-gei-border rounded-xl p-8">
              <div className="text-center">
                <svg className="w-12 h-12 text-gei-cyan mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
                <p className="text-sm text-gei-text-muted mb-4">
                  Authentication is configured through Auth.js providers.
                  Please configure your authentication provider (e.g., GitHub, Google, or email magic links)
                  by setting the required environment variables.
                </p>
                <p className="text-xs text-gei-text-muted">
                  See <code className="bg-gei-surface-light px-1 rounded">.env.example</code> and{" "}
                  <code className="bg-gei-surface-light px-1 rounded">SETUP.md</code> for configuration details.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gei-surface border border-gei-border rounded-xl p-8">
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 mb-6">
                <p className="text-xs text-yellow-400 font-medium">
                  Development mode — This login form is only available in development.
                  Production deployments use configured OAuth/email providers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3" role="alert">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gei-text mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gei-text mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gei-cyan text-gei-near-black font-semibold rounded-lg hover:bg-gei-cyan/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-4 text-center text-sm text-gei-text-muted">
                Dev credentials: admin@dev.local / DevAdmin12345!
              </div>
            </div>
          )}

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gei-text-muted">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-gei-cyan hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-sm text-gei-text-muted">
              Want to contribute without an account?{" "}
              <Link href="/apply" className="text-gei-cyan hover:underline">
                Apply first
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
