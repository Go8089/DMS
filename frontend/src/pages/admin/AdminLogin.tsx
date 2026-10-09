
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/admin";
import { setToken } from "@/lib/auth";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login({ username, password });

      setToken(response.token);
      navigate("/admin");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030817] px-4 py-12 text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-blue-400/20 bg-[#081329]/85 p-7 shadow-2xl shadow-blue-950/30 backdrop-blur-xl sm:p-9">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-500/20 to-violet-600/20">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-8 w-8 text-sky-300"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 10h.01M15 10h.01"
                />
              </svg>
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              DMV School
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Admin <span className="text-sky-300">Login</span>
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sign in to access your school website dashboard and manage
              school content.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:scale-[1.01] hover:from-sky-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Signing in..." : "Sign in to Dashboard"}
            </button>
          </form>

          <div className="mt-7 border-t border-slate-700/70 pt-5 text-center">
            <Link
              to="/"
              className="text-sm text-slate-400 transition hover:text-sky-300"
            >
              ← Back to School Website
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          DMV School · Administration Portal
        </p>
      </div>
    </main>
  );
}

export default AdminLogin;
