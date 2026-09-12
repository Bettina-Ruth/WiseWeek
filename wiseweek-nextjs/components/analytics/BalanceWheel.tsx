"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { categoryHours, dominatingCategoryLabel } from "@/lib/analytics-utils";

export default function BalanceWheel() {
  const { weekTasks, categories } = useWiseWeek();
  const data = categoryHours(weekTasks, categories);
  const dominant = dominatingCategoryLabel(data);

  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base text-text">Life balance wheel</h3>
        <span className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[10.5px] uppercase text-text-dim">{dominant}</span>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <ResponsiveContainer width={260} height={220}>
          <RadarChart data={data} outerRadius="70%">
            <PolarGrid stroke="var(--line)" />
            <PolarAngleAxis dataKey="label" tick={{ fill: "var(--text-dim)", fontSize: 10 }} />
            <Radar dataKey="hours" stroke="var(--sage-hover)" fill="var(--sage)" fillOpacity={0.35} strokeWidth={1.75} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex min-w-[200px] flex-1 flex-wrap gap-2.5">
          {data.map((c) => (
            <span key={c.label} className="rounded-full bg-surface2 px-3 py-1.5 text-[12px] text-text-dim">
              <strong className="text-text">{c.label}</strong> {c.hours}h
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
