"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useWiseWeek } from "@/context/WiseWeekContext";

export default function TimeLeaksCard() {
  const { timeLeaks, addTimeLeak, removeTimeLeak } = useWiseWeek();
  const [label, setLabel] = useState("");
  const [hours, setHours] = useState("");
  const max = Math.max(1, ...timeLeaks.map((l) => l.hours));
  const total = Math.round(timeLeaks.reduce((s, l) => s + l.hours, 0) * 10) / 10;

  function handleAdd() {
    const h = parseFloat(hours);
    if (!label.trim() || !h || h <= 0) return;
    addTimeLeak(label, h);
    setLabel("");
    setHours("");
  }

  return (
    <div className="card">
      <div className="mb-3.5 flex items-center justify-between">
        <h3 className="font-display text-base text-text">Time leaks</h3>
        <span className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[10.5px] uppercase text-text-dim">
          {total > 0 ? `${total}h logged` : "0h logged"}
        </span>
      </div>
      {timeLeaks.length === 0 ? (
        <div className="mb-3 text-[13px] text-text-dim">No time leaks logged yet — add what&apos;s eating your week below.</div>
      ) : (
        timeLeaks.map((l, idx) => (
          <div key={l.label} className="mb-2.5 flex items-center gap-2.5 text-xs">
            <span className="w-24 font-mono text-text-dim">{l.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface2">
              <div className="h-full rounded-full bg-clay" style={{ width: `${(l.hours / max) * 100}%` }} />
            </div>
            <span className="w-10 text-right font-mono text-text-dim">{l.hours}h</span>
            <button onClick={() => removeTimeLeak(idx)} className="text-text-dim hover:text-clay">
              <X size={12} />
            </button>
          </div>
        ))
      )}
      <div className="mt-3 flex gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Social media"
          className="flex-1 rounded-lg border border-line bg-surface2 px-3 py-2 text-[12.5px] text-text focus:border-sage focus:outline-none"
        />
        <input
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          type="number"
          min={0}
          max={24}
          step={0.5}
          placeholder="Hours"
          className="w-24 rounded-lg border border-line bg-surface2 px-3 py-2 text-[12.5px] text-text focus:border-sage focus:outline-none"
        />
        <button onClick={handleAdd} className="rounded-full border border-line px-4 py-2 text-[12.5px] text-text hover:border-sage">
          Add
        </button>
      </div>
    </div>
  );
}
