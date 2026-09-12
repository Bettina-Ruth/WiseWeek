"use client";

import { useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";
import Topbar from "@/components/layout/Topbar";
import { ACHIEVEMENTS, SCORE_HISTORY } from "@/lib/mock-data";

// Deterministic pseudo-random streak pattern (avoids hydration mismatch from Math.random)
const STREAK_PATTERN = [
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
  1,
];

export default function ProfilePage() {
  const data = useMemo(() => SCORE_HISTORY.map((v, i) => ({ i, v })), []);

  return (
    <>
      <Topbar title="Profile" sub="Sam Kapoor" />
      <div className="flex-1 overflow-y-auto p-7">
        <div className="card mb-4">
          <div className="mb-5 flex items-center gap-5">
            <div className="flex h-[74px] w-[74px] items-center justify-center rounded-[20px] bg-gradient-to-br from-indigo to-sage font-display text-2xl text-white">
              SK
            </div>
            <div>
              <h3 className="mb-1 font-display text-lg text-text">Sam Kapoor</h3>
              <div className="text-xs text-text-dim">Planning weekly since Feb 2026 · Free trial → Plus</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ACHIEVEMENTS.map((a) => (
              <span key={a} className="rounded-full bg-sage-soft px-3 py-1.5 text-xs text-sage-text">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="card">
            <h3 className="mb-4 font-display text-base text-text">Streak</h3>
            <div className="grid grid-cols-10 gap-1.5">
              {STREAK_PATTERN.map((on, i) => (
                <div key={i} className={`aspect-square rounded ${on ? "bg-sage" : "bg-surface2"}`} />
              ))}
            </div>
            <p className="mt-2.5 text-xs text-text-dim">18-day planning streak.</p>
          </div>
          <div className="card">
            <h3 className="mb-4 font-display text-base text-text">Weekly life score history</h3>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={data}>
                <YAxis domain={["dataMin", "dataMax"]} hide />
                <Area type="monotone" dataKey="v" stroke="#94B58B" fill="#94B58B" fillOpacity={0.12} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
