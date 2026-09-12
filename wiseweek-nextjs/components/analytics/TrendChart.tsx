"use client";

import { useMemo, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import clsx from "clsx";

type Range = "week" | "month" | "all";

function extrapolateRange(weekValues: number[], points: number): number[] {
  const avg = weekValues.reduce((a, b) => a + b, 0) / weekValues.length;
  const spread = Math.max(...weekValues) - Math.min(...weekValues) || 4;
  const out: number[] = [];
  for (let i = 0; i < points; i++) {
    const wobble = Math.sin(i * 0.7) * spread * 0.5 + (Math.random() - 0.5) * spread * 0.3;
    out.push(Math.round(avg + wobble));
  }
  return [...out, ...weekValues];
}

export default function TrendChart({
  title,
  weekValues,
  color,
  headline,
}: {
  title: string;
  weekValues: number[];
  color: string;
  headline: string;
}) {
  const [range, setRange] = useState<Range>("week");

  const values = useMemo(() => {
    if (range === "month") return extrapolateRange(weekValues, 21);
    if (range === "all") return extrapolateRange(weekValues, 77);
    return weekValues;
  }, [range, weekValues]);

  const data = values.map((v, i) => ({ i, v }));

  return (
    <div className="card">
      <h3 className="mb-3 font-display text-base text-text">{title}</h3>
      <div className="mb-3 font-mono text-2xl text-text">{headline}</div>
      <div className="mb-3 flex gap-1.5">
        {(["week", "month", "all"] as Range[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={clsx(
              "rounded-full border px-3 py-1 text-[11.5px]",
              range === r ? "border-sage bg-sage-soft text-sage-text" : "border-line bg-surface2 text-text-dim"
            )}
          >
            {r === "week" ? "1 week" : r === "month" ? "1 month" : "All time"}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data} margin={{ top: 10, right: 6, left: 6, bottom: 0 }}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Area type="monotone" dataKey="v" stroke={color} fill={color} fillOpacity={0.12} strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
