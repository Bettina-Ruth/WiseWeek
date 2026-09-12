"use client";

import Topbar from "@/components/layout/Topbar";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { computeReflectionInsights } from "@/lib/reflection";
import { MEMORIES } from "@/lib/mock-data";

export default function ReflectionPage() {
  const { weekTasks, dayMood, timeLeaks, categories } = useWiseWeek();
  const insights = computeReflectionInsights(weekTasks, dayMood, timeLeaks, categories);

  return (
    <>
      <Topbar title="Reflection" sub="What this week taught you" />
      <div className="flex-1 overflow-y-auto p-7">
        <div className="mx-auto max-w-[640px] px-2 pb-16 pt-3">
          <div className="mb-6">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-wide text-text-dim">
              Reflection · generated from your data
            </div>
            <h2 className="mb-3 font-display text-[29px] leading-tight text-text">What this week told you</h2>
            <p className="mb-9 max-w-[480px] text-[14.5px] leading-relaxed text-text-dim">
              A few honest observations, drawn from what you actually planned, finished, and felt — not a summary
              of checkboxes.
            </p>
          </div>

          <div>
            {insights.map((x, i) => (
              <div
                key={x.title}
                className={`flex gap-[18px] py-6 ${i < insights.length - 1 ? "border-b border-line" : ""} ${i === 0 ? "pt-0" : ""}`}
              >
                <div className="mt-0.5 flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border border-line bg-surface2 text-[13px] text-sage-text">
                  {x.icon}
                </div>
                <div>
                  <div className="mb-1.5 font-display text-[17px] leading-snug text-text">{x.title}</div>
                  <div className="text-[13.5px] leading-relaxed text-text-dim">{x.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-12 h-px bg-line" />

          <h2 className="mb-4 font-display text-[21px] text-text">Memory timeline</h2>
          <div>
            {MEMORIES.map((m, i) => (
              <div key={m} className="flex gap-4 py-3.5">
                <div className="flex flex-col items-center">
                  <div className="h-[9px] w-[9px] rounded-full bg-sage" />
                  {i < MEMORIES.length - 1 && <div className="mt-1 w-px flex-1 bg-line" />}
                </div>
                <div className="pb-2 text-[12.5px] text-text">{m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
