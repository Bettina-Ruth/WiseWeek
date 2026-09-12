"use client";

import Link from "next/link";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { DAYS } from "@/lib/date-utils";
import FaqAccordion from "@/components/landing/FaqAccordion";
import { Sun, Moon } from "lucide-react";

const DEMO_TASKS: { t: string; c: "must" | "should" | "nice" }[][] = [
  [{ t: "Ship onboarding v2", c: "must" }, { t: "Standup", c: "nice" }],
  [{ t: "Client proposal", c: "must" }, { t: "Gym", c: "nice" }],
  [{ t: "Design review", c: "should" }],
  [{ t: "Write report", c: "must" }, { t: "1:1s", c: "should" }],
  [{ t: "Wrap sprint", c: "should" }, { t: "Demo", c: "nice" }],
  [{ t: "Rest", c: "nice" }],
  [{ t: "Plan next week", c: "nice" }],
];

const CHIP_BG: Record<string, string> = {
  must: "var(--pri-must-bg)",
  should: "var(--pri-should-bg)",
  nice: "var(--pri-nice-bg)",
};

const FEATURES = [
  { icon: "⚡", t: "Energy-based planning", d: "Tasks are recommended for your high, medium, and low energy windows — not just your open calendar slots." },
  { icon: "◐", t: "Life balance meter", d: "A visual wheel across 9 life categories warns you when one area is quietly swallowing your week." },
  { icon: "✓", t: "Reality check", d: "Compares your planned workload against real available hours — Healthy, Busy, or Impossible." },
  { icon: "↻", t: "Smart carry forward", d: "Partially finished tasks continue where you left off, instead of duplicating a fresh copy." },
  { icon: "✦", t: "AI weekly reflection", d: "\u201CWednesday is your least productive day\u201D — real behavioral insight, not a checkbox summary." },
  { icon: "▸", t: "Anti-procrastination", d: "Big vague tasks are broken into the tiniest possible first action, automatically." },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useWiseWeek();

  return (
    <div>
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-line bg-bg/80 px-12 py-5 backdrop-blur-md">
        <div className="flex items-center gap-2.5 font-display text-xl font-semibold text-text">
          <span className="inline-block h-[22px] w-[22px] rounded-md bg-gradient-to-br from-sage to-clay" />
          WiseWeek
        </div>
        <div className="hidden gap-8 text-sm text-text-dim md:flex">
          <a href="#features" className="hover:text-text">Features</a>
          <a href="#testimonials" className="hover:text-text">Stories</a>
          <a href="#pricing" className="hover:text-text">Pricing</a>
          <a href="#faq" className="hover:text-text">FAQ</a>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-surface text-text-dim hover:text-text"
          >
            {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <Link href="/login" className="rounded-full border border-line px-5 py-2.5 text-sm text-text hover:border-sage">
            Log in
          </Link>
          <Link href="/login?mode=signup" className="rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-[#152014] hover:bg-sage-hover">
            Start planning
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-[1180px] px-12 pb-20 pt-28 text-center">
        <span className="mb-7 inline-flex items-center gap-2 rounded-full bg-sage-soft px-3.5 py-1.5 font-mono text-xs tracking-wide text-sage-text">
          ● Now with AI Weekly Reflection
        </span>
        <h1 className="mx-auto mb-5 max-w-3xl font-display text-[clamp(40px,6vw,72px)] leading-[1.05] text-text">
          Plan a week you can <em className="text-sage-text not-italic italic">actually</em> live up to.
        </h1>
        <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-text-dim">
          WiseWeek doesn&apos;t just organize your tasks — it tells you when your week is impossible before you
          live through it.
        </p>
        <div className="mb-16 flex justify-center gap-3.5">
          <Link href="/login?mode=signup" className="rounded-full bg-sage px-6 py-3.5 text-sm font-medium text-[#152014] hover:bg-sage-hover">
            Start planning free
          </Link>
          <Link href="/dashboard" className="rounded-full border border-line px-6 py-3.5 text-sm text-text hover:border-sage">
            See a live week ↗
          </Link>
        </div>

        <div className="mx-auto max-w-[920px] rounded-[20px] border border-line bg-surface p-7 text-left shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-text-dim">This week · Reality check</span>
            <span className="rounded-full bg-warn-soft px-3.5 py-1.5 text-xs font-semibold text-warn">⚠ Busy Week</span>
          </div>
          <div className="grid grid-cols-7 gap-2.5">
            {DAYS.map((d, i) => (
              <div key={d} className="min-h-[120px] rounded-[10px] border border-line bg-surface2 p-2">
                <div className="mb-2 font-mono text-[11px] text-text-dim">{d}</div>
                {DEMO_TASKS[i].map((x) => (
                  <span
                    key={x.t}
                    className="mb-1 block rounded-md px-1.5 py-1 text-[11px] font-medium"
                    style={{ background: CHIP_BG[x.c], color: "var(--pri-text)" }}
                  >
                    {x.t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-[1180px] px-12 py-24">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-sage-soft px-3.5 py-1.5 font-mono text-xs tracking-wide text-sage-text">
            Why it&apos;s different
          </span>
          <h2 className="mb-3.5 font-display text-[clamp(30px,4vw,44px)] text-text">
            A planner that improves your decisions,
            <br />
            not just your list.
          </h2>
          <p className="mx-auto max-w-lg text-text-dim">
            Every feature exists to answer one question: does this help you plan better?
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="card transition-all hover:-translate-y-1 hover:border-sage">
              <div className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[9px] bg-sage-soft text-lg text-sage-text">
                {f.icon}
              </div>
              <h3 className="mb-2 text-[15px] font-semibold text-text">{f.t}</h3>
              <p className="text-sm leading-relaxed text-text-dim">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-[1180px] px-12 py-24">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-sage-soft px-3.5 py-1.5 font-mono text-xs tracking-wide text-sage-text">
            Trusted by planners
          </span>
          <h2 className="font-display text-[clamp(30px,4vw,44px)] text-text">People who stopped overplanning</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { q: "WiseWeek told me my week was impossible on Monday morning — before I found out the hard way on Thursday night.", n: "Priya N.", r: "Founder, 2-person startup" },
            { q: "The energy tags changed how I schedule deep work. I stopped putting hard coding tasks at 4pm.", n: "Marcus T.", r: "Backend engineer" },
            { q: "The reflection page noticed I underestimate every writing task by 40%. It was right, and slightly annoying.", n: "Elena R.", r: "PhD researcher" },
          ].map((t) => (
            <div key={t.n} className="card">
              <p className="mb-[18px] text-sm leading-relaxed text-text">&quot;{t.q}&quot;</p>
              <div className="flex items-center gap-2.5">
                <div className="h-[34px] w-[34px] rounded-full bg-gradient-to-br from-indigo to-sage" />
                <div>
                  <div className="text-[13px] font-semibold text-text">{t.n}</div>
                  <div className="text-xs text-text-dim">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-[1180px] px-12 py-24">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-sage-soft px-3.5 py-1.5 font-mono text-xs tracking-wide text-sage-text">
            Pricing
          </span>
          <h2 className="font-display text-[clamp(30px,4vw,44px)] text-text">Start free. Upgrade when it earns it.</h2>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          <div className="card flex flex-col">
            <h3 className="mb-1.5 text-[15px] font-semibold text-text">Free</h3>
            <div className="my-2.5 font-display text-4xl text-text">
              $0<span className="font-body text-sm text-text-dim">/mo</span>
            </div>
            <ul className="my-[18px] flex-1 space-y-2 text-[13.5px] text-text-dim">
              <li>— Weekly planner</li>
              <li>— Dashboard</li>
              <li>— Basic analytics</li>
              <li>— 1 reflection / week</li>
            </ul>
            <Link href="/login?mode=signup" className="rounded-full border border-line px-5 py-2.5 text-center text-sm text-text">
              Get started
            </Link>
          </div>
          <div className="card relative flex flex-col border-sage">
            <span className="absolute -top-2.5 left-6 rounded-full bg-sage px-2.5 py-1 text-[11px] font-semibold text-[#152014]">
              Most chosen
            </span>
            <h3 className="mb-1.5 text-[15px] font-semibold text-text">Plus</h3>
            <div className="my-2.5 font-display text-4xl text-text">
              $9<span className="font-body text-sm text-text-dim">/mo</span>
            </div>
            <ul className="my-[18px] flex-1 space-y-2 text-[13.5px] text-text-dim">
              <li>— Everything in Free</li>
              <li>— AI Weekly Reflection</li>
              <li>— Time Leak Detector</li>
              <li>— Unlimited history</li>
              <li>— Future Me messages</li>
            </ul>
            <Link href="/login?mode=signup" className="rounded-full bg-sage px-5 py-2.5 text-center text-sm font-medium text-[#152014]">
              Start free trial
            </Link>
          </div>
          <div className="card flex flex-col">
            <h3 className="mb-1.5 text-[15px] font-semibold text-text">Teams</h3>
            <div className="my-2.5 font-display text-4xl text-text">
              $19<span className="font-body text-sm text-text-dim">/user/mo</span>
            </div>
            <ul className="my-[18px] flex-1 space-y-2 text-[13.5px] text-text-dim">
              <li>— Everything in Plus</li>
              <li>— Shared weekly reviews</li>
              <li>— Admin controls</li>
              <li>— Priority support</li>
            </ul>
            <Link href="/login?mode=signup" className="rounded-full border border-line px-5 py-2.5 text-center text-sm text-text">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[1180px] px-12 py-24">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-sage-soft px-3.5 py-1.5 font-mono text-xs tracking-wide text-sage-text">
            Questions
          </span>
          <h2 className="font-display text-[clamp(30px,4vw,44px)] text-text">Frequently asked</h2>
        </div>
        <FaqAccordion />
      </section>

      <footer className="border-t border-line px-12 pb-10 pt-16">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-display text-xl font-semibold text-text">
              <span className="inline-block h-[22px] w-[22px] rounded-md bg-gradient-to-br from-sage to-clay" />
              WiseWeek
            </div>
            <p className="mt-3.5 max-w-xs text-sm leading-relaxed text-text-dim">
              A weekly planner built to improve how you decide, not just what you check off.
            </p>
          </div>
          <div>
            <h4 className="mb-3.5 text-sm text-text-dim">Product</h4>
            <a href="#features" className="block py-1.5 text-sm text-text">Features</a>
            <a href="#pricing" className="block py-1.5 text-sm text-text">Pricing</a>
            <Link href="/dashboard" className="block py-1.5 text-sm text-text">Dashboard</Link>
          </div>
          <div>
            <h4 className="mb-3.5 text-sm text-text-dim">Company</h4>
            <a href="#" className="block py-1.5 text-sm text-text">About</a>
            <a href="#" className="block py-1.5 text-sm text-text">Careers</a>
            <a href="#" className="block py-1.5 text-sm text-text">Blog</a>
          </div>
          <div>
            <h4 className="mb-3.5 text-sm text-text-dim">Support</h4>
            <Link href="/help" className="block py-1.5 text-sm text-text">Help center</Link>
            <a href="#" className="block py-1.5 text-sm text-text">Contact</a>
            <a href="#" className="block py-1.5 text-sm text-text">Status</a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1180px] justify-between border-t border-line pt-6 text-xs text-text-dim">
          <span>© 2026 WiseWeek. All rights reserved.</span>
          <span>Made for people who plan weekly.</span>
        </div>
      </footer>
    </div>
  );
}
