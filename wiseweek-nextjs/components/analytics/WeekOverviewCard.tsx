"use client";

import { useWiseWeek, realityRating } from "@/context/WiseWeekContext";
import { realityBadgeClasses } from "@/lib/task-colors";
import { tierHours } from "@/lib/analytics-utils";

export default function WeekOverviewCard() {
  const { weekTasks, totalPlannedHours } = useWiseWeek();
  const planned = totalPlannedHours();
  const rating = realityRating(planned);
  const { must, should, nice } = tierHours(weekTasks);
  const max = Math.max(must, should, nice, 0.1);

  const rows = [
    { label: "Must", value: must, color: "bg-clay" },
    { label: "Should", value: should, color: "bg-indigo" },
    { label: "Nice-to-have", value: nice, color: "bg-sage" },
  ];

  return (
    <div className="card">
      <div className="mb-3.5 flex items-center justify-between">
        <h3 className="font-display text-base text-text">Week overview</h3>
      </div>
      <span className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${realityBadgeClasses[rating.cls]}`}>
        {rating.icon} {rating.label} — {planned.toFixed(1)}h / 42h
      </span>
      {rows.map((r) => (
        <div key={r.label} className="mb-2.5 flex items-center gap-2.5 text-xs">
          <span className="w-24 font-mono text-text-dim">{r.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface2">
            <div className={`h-full rounded-full ${r.color}`} style={{ width: `${Math.min(100, (r.value / max) * 100)}%` }} />
          </div>
          <span className="w-12 text-right font-mono text-text-dim">{r.value.toFixed(1)}h</span>
        </div>
      ))}
    </div>
  );
}
