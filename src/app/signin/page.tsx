"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const demo = (email: string) => {
    setLoading(email);
    signIn("demo", { email, callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Hero */}
      <div className="hidden md:flex flex-col justify-between p-14 text-white bg-gradient-to-br from-[#042a16] to-brand">
        <div className="flex items-center gap-2 font-bold">
          <span className="flex gap-1">
            <i className="w-1.5 h-6 rounded bg-white" />
            <i className="w-1.5 h-6 rounded bg-white" />
            <i className="w-1.5 h-6 rounded bg-brand-dark" />
          </span>
          MUST COMPANY
        </div>
        <div className="max-w-md space-y-3">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back to HRIS!</h1>
          <p className="text-white/80">
            One home for your work life at MUST — track your leave, view payslips, sign documents, and stay
            close to your team.
          </p>
          <p className="text-xs tracking-widest text-white/60 pt-4">CHALLENGE · TOGETHER · ACHIEVE</p>
        </div>
      </div>

      {/* Auth card */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold">Sign in</h2>
            <p className="text-sm text-muted">Use your MUST account to continue.</p>
          </div>

          <button
            className="btn-primary w-full"
            onClick={() => {
              setLoading("google");
              signIn("google", { callbackUrl: "/dashboard" });
            }}
            disabled={loading !== null}
          >
            {loading === "google" ? "Redirecting…" : "Continue with Google"}
          </button>
          <p className="text-center text-xs text-muted">🔒 Only @must.company accounts</p>

          <div className="border-t border-line pt-5">
            <p className="text-center text-[11px] uppercase tracking-wide text-muted mb-3">
              Demo login (dev only)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-ghost" onClick={() => demo("sarah.miller@must.company")} disabled={loading !== null}>
                As Sarah <span className="text-muted">· employee</span>
              </button>
              <button className="btn-ghost" onClick={() => demo("ethan.miller@must.company")} disabled={loading !== null}>
                As Ethan <span className="text-muted">· lead</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
