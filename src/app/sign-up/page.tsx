"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Valid email is required";
    if (formData.password.length < 12)
      errs.password = "Password must be at least 12 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      errs.password = "Must contain uppercase, lowercase, and a number";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords must match";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setServerError(data.error || "Registration failed. Please try again.");
      }
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
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
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 text-gei-text-muted">
              Join the GEI research community
            </p>
          </div>

          {!isDevAuth ? (
            <div className="bg-gei-surface border border-gei-border rounded-xl p-8">
              <div className="text-center">
                <svg className="w-12 h-12 text-gei-cyan mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <h2 className="text-xl font-semibold mb-2">Registration Setup Required</h2>
                <p className="text-sm text-gei-text-muted mb-4">
                  Account creation requires a configured authentication provider and database.
                  See the setup documentation for deployment instructions.
                </p>
                <p className="text-xs text-gei-text-muted mb-6">
                  In the meantime, you can{" "}
                  <Link href="/apply" className="text-gei-cyan hover:underline">
                    apply to contribute
                  </Link>{" "}
                  without an account.
                </p>
              </div>
            </div>
          ) : success ? (
            <div className="bg-gei-surface border border-gei-border rounded-xl p-8 text-center">
              <svg className="w-12 h-12 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">Account Created</h2>
              <p className="text-sm text-gei-text-muted mb-4">
                You can now sign in to access your contributor workspace.
              </p>
              <Link
                href="/sign-in"
                className="inline-flex items-center px-6 py-3 bg-gei-cyan text-gei-near-black font-semibold rounded-lg hover:bg-gei-cyan/90 transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="bg-gei-surface border border-gei-border rounded-xl p-8">
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3 mb-6">
                <p className="text-xs text-yellow-400 font-medium">
                  Development mode — Registration available in dev mode only.
                  Production uses configured auth providers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {serverError && (
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3" role="alert">
                    <p className="text-sm text-red-400">{serverError}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gei-text mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    autoComplete="name"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gei-text mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    autoComplete="email"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gei-text mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    autoComplete="new-password"
                  />
                  <p className="text-xs text-gei-text-muted mt-1">
                    Min 12 characters, including uppercase, lowercase, and a number
                  </p>
                  {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gei-text mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gei-cyan text-gei-near-black font-semibold rounded-lg hover:bg-gei-cyan/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="mt-4 text-xs text-gei-text-muted text-center">
                New accounts default to member role. Reviewer and admin roles
                are granted explicitly by administrators.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gei-text-muted">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-gei-cyan hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
