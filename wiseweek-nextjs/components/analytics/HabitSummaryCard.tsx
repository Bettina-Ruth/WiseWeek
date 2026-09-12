"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useWiseWeek } from "@/context/WiseWeekContext";

export default function HabitSummaryCard() {
  const { habitGoals, addHabitGoal, removeHabitGoal, habitDoneCount } = useWiseWeek();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");

  function handleAdd() {
    const t = parseInt(target, 10);
    if (!name.trim() || !t || t <= 0) return;
    addHabitGoal(name, t);
    setName("");
    setTarget("");
  }

  return (
    <div className="card">
      <h3 className="mb-3.5 font-display text-base text-text">Habit summary</h3>
      {habitGoals.length === 0 ? (
        <div className="mb-3 text-[13px] text-text-dim">No habits tracked yet — add one below.</div>
      ) : (
        habitGoals.map((h, idx) => {
          const done = habitDoneCount(h.name);
          const pct = h.target ? Math.min(100, (done / h.target) * 100) : 0;
          return (
            <div key={h.name} className="mb-2.5 flex items-center gap-2.5 text-xs">
              <span className="w-24 font-mono text-text-dim">{h.name}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface2">
                <div className="h-full rounded-full bg-sage" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-10 text-right font-mono text-text-dim">
                {done}/{h.target}
              </span>
              <button onClick={() => removeHabitGoal(idx)} className="text-text-dim hover:text-clay">
                <X size={12} />
              </button>
            </div>
          );
        })
      )}
      <div className="mt-3 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Habit or category name"
          className="flex-1 rounded-lg border border-line bg-surface2 px-3 py-2 text-[12.5px] text-text focus:border-sage focus:outline-none"
        />
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          type="number"
          min={1}
          placeholder="# tasks"
          className="w-24 rounded-lg border border-line bg-surface2 px-3 py-2 text-[12.5px] text-text focus:border-sage focus:outline-none"
        />
        <button onClick={handleAdd} className="rounded-full border border-line px-4 py-2 text-[12.5px] text-text hover:border-sage">
          Add
        </button>
      </div>
    </div>
  );
}
