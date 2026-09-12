"use client";

import { useWiseWeek, realityRating } from "@/context/WiseWeekContext";
import { realityBadgeClasses } from "@/lib/task-colors";

export default function RealityStrip() {
  const { totalPlannedHours, weekTasks } = useWiseWeek();
  const planned = totalPlannedHours();
  const rating = realityRating(planned);

  let must = 0;
  let mustDone = 0;
  weekTasks.forEach((day) =>
    day.forEach((t) => {
      if (t.tier === "must") {
        must++;
        if (t.done) mustDone++;
      }
    })
  );

  return (
    <div className="mb-[22px] flex flex-wrap items-center justify-between gap-5 rounded-xl border border-line bg-surface px-[26px] py-[22px]">
      <div>
        <div className="mb-2 font-display text-[13px] italic text-text-dim">Reality check</div>
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${realityBadgeClasses[rating.cls]}`}>
          {rating.icon} {rating.label} — {planned.toFixed(1)}h / 42h
        </span>
      </div>
      <div className="text-right">
        <div className="mb-2 font-display text-[13px] italic text-text-dim">This week&apos;s priorities</div>
        <div className="font-mono text-xl text-text">
          {must === 0 ? "No must-do tasks set" : `${mustDone}/${must} must-do done`}
        </div>
      </div>
    </div>
  );
}
