"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useWiseWeek } from "@/context/WiseWeekContext";

type Panel = "login" | "signup" | "forgot" | "verify";

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 009 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.17.27-1.7V4.97H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 00.96 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

export default function AuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, toggleTheme, showToast } = useWiseWeek();

  const [panel, setPanel] = useState<Panel>(searchParams.get("mode") === "signup" ? "signup" : "login");
  const [busy, setBusy] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [verifyTarget, setVerifyTarget] = useState("");

  const initials = signupName.trim()
    ? signupName.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  function handleLogin() {
    if (!loginEmail.trim()) {
      showToast("Enter your email to continue.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      router.push("/dashboard");
    }, 500);
  }

  function handleSignup() {
    if (!signupName.trim() || !signupEmail.trim()) {
      showToast("Add your name and email to continue.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setVerifyTarget(signupEmail);
      setPanel("verify");
    }, 500);
  }

  function handleForgot() {
    if (!forgotEmail.trim()) {
      showToast("Enter your email first.");
      return;
    }
    setForgotSent(true);
  }

  function handleGoogle() {
    showToast("Google sign-in is simulated in this prototype.");
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative flex w-full items-center justify-center p-10">
        <button
          onClick={toggleTheme}
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-surface text-text-dim hover:text-text"
        >
          {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
        </button>

        <div className="w-full max-w-[360px]">
          <div className="mb-8 flex items-center justify-center gap-2.5 font-display text-xl font-semibold text-text">
            <span className="inline-block h-[22px] w-[22px] rounded-md bg-gradient-to-br from-sage to-clay" />
            WiseWeek
          </div>

          {panel === "login" && (
            <>
              <h2 className="mb-2 text-center text-[27px] text-text">Welcome back</h2>
              <p className="mb-6 text-center text-sm leading-relaxed text-text-dim">
                Log in to see how your week is actually shaping up.
              </p>
              <button
                onClick={handleGoogle}
                className="mb-1 flex w-full items-center justify-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-[13.5px] text-text hover:border-sage"
              >
                <GoogleIcon /> Continue with Google
              </button>
              <div className="my-5 flex items-center gap-3.5 text-xs text-text-dim">
                <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
              </div>
              <label className="mb-1.5 block text-[12.5px] font-medium text-text">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text focus:border-sage focus:outline-none"
              />
              <label className="mb-1.5 mt-4 block text-[12.5px] font-medium text-text">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text focus:border-sage focus:outline-none"
              />
              <div className="mt-2.5 text-right">
                <button onClick={() => setPanel("forgot")} className="text-[12.5px] text-sage-text">
                  Forgot password?
                </button>
              </div>
              <button
                onClick={handleLogin}
                disabled={busy}
                className="mt-5 w-full rounded-full bg-sage py-3 text-[14.5px] font-medium text-[#152014] hover:bg-sage-hover disabled:opacity-70"
              >
                {busy ? "Logging in…" : "Log in"}
              </button>
              <p className="mt-6 text-center text-[13px] text-text-dim">
                Don&apos;t have an account?{" "}
                <button onClick={() => setPanel("signup")} className="font-medium text-sage-text">
                  Sign up
                </button>
              </p>
            </>
          )}

          {panel === "signup" && (
            <>
              <h2 className="mb-2 text-center text-[27px] text-text">Create your account</h2>
              <p className="mb-6 text-center text-sm leading-relaxed text-text-dim">
                Start planning weeks you can actually live up to.
              </p>
              <button
                onClick={handleGoogle}
                className="mb-1 flex w-full items-center justify-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-[13.5px] text-text hover:border-sage"
              >
                <GoogleIcon /> Continue with Google
              </button>
              <div className="my-5 flex items-center gap-3.5 text-xs text-text-dim">
                <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
              </div>
              <div className="flex items-end gap-3.5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-sage font-display text-base font-semibold text-[#152014]">
                  {initials}
                </div>
                <div className="flex-1">
                  <label className="mb-1.5 block text-[12.5px] font-medium text-text">Name</label>
                  <input
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text focus:border-sage focus:outline-none"
                  />
                </div>
              </div>
              <label className="mb-1.5 mt-4 block text-[12.5px] font-medium text-text">Email</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text focus:border-sage focus:outline-none"
              />
              <label className="mb-1.5 mt-4 block text-[12.5px] font-medium text-text">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                onKeyDown={(e) => e.key === "Enter" && handleSignup()}
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text focus:border-sage focus:outline-none"
              />
              <button
                onClick={handleSignup}
                disabled={busy}
                className="mt-5 w-full rounded-full bg-sage py-3 text-[14.5px] font-medium text-[#152014] hover:bg-sage-hover disabled:opacity-70"
              >
                {busy ? "Creating account…" : "Create account"}
              </button>
              <p className="mt-6 text-center text-[13px] text-text-dim">
                Already have an account?{" "}
                <button onClick={() => setPanel("login")} className="font-medium text-sage-text">
                  Log in
                </button>
              </p>
            </>
          )}

          {panel === "forgot" && (
            <>
              <h2 className="mb-2 text-center text-[27px] text-text">Reset your password</h2>
              <p className="mb-6 text-center text-sm leading-relaxed text-text-dim">
                Enter your email and we&apos;ll send you a reset link.
              </p>
              {!forgotSent ? (
                <>
                  <label className="mb-1.5 block text-[12.5px] font-medium text-text">Email</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleForgot()}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-text focus:border-sage focus:outline-none"
                  />
                  <button
                    onClick={handleForgot}
                    className="mt-5 w-full rounded-full bg-sage py-3 text-[14.5px] font-medium text-[#152014] hover:bg-sage-hover"
                  >
                    Send reset link
                  </button>
                </>
              ) : (
                <div className="rounded-xl bg-surface2 p-4 text-center text-[13px] text-text-dim">
                  If an account exists for <strong className="text-text">{forgotEmail}</strong>, a reset link is on
                  its way.
                </div>
              )}
              <p className="mt-6 text-center text-[13px] text-text-dim">
                Remembered it?{" "}
                <button onClick={() => setPanel("login")} className="font-medium text-sage-text">
                  Back to log in
                </button>
              </p>
            </>
          )}

          {panel === "verify" && (
            <>
              <div className="mb-3.5 text-center text-4xl">✉️</div>
              <h2 className="mb-2 text-center text-[22px] text-text">Check your email</h2>
              <p className="mb-6 text-center text-sm leading-relaxed text-text-dim">
                We&apos;ve sent a verification link to <strong className="text-text">{verifyTarget}</strong>. Confirm
                it to finish setting up your account.
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full rounded-full bg-sage py-3 text-[14.5px] font-medium text-[#152014] hover:bg-sage-hover"
              >
                Continue to WiseWeek
              </button>
              <p className="mt-6 text-center text-[13px] text-text-dim">
                <button onClick={() => showToast("Verification email resent.")} className="font-medium text-sage-text">
                  Resend email
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
