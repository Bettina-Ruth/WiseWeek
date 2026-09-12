"use client";

import { useWiseWeek } from "@/context/WiseWeekContext";

export default function LastWeekCarryover() {
  const { lastWeekNextWeek, pullFromLastWeek } = useWiseWeek();

  return (
    <div className="card mt-[18px]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base text-text">Carried from last week&apos;s &quot;Next week&quot; list</h3>
        <span className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[10.5px] uppercase text-text-dim">
          Pull in if it&apos;s time
        </span>
      </div>
      {lastWeekNextWeek.length === 0 ? (
        <div className="py-4 text-center text-[13px] text-text-dim">Nothing left over from last week.</div>
      ) : (
        lastWeekNextWeek.map((task, idx) => (
          <div key={task.id} className="flex items-center gap-2.5 border-b border-line py-2.5 last:border-none">
            <span className="text-text-dim">↳</span>
            <div className="flex-1 text-[13px] text-text">
              {task.t}{" "}
              <span className="ml-1.5 rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-dim">
                {task.category}
              </span>
            </div>
            <button
              onClick={() => pullFromLastWeek(idx)}
              className="rounded-full border border-line px-3 py-1.5 text-[11.5px] text-text hover:border-sage"
            >
              Pull into today
            </button>
          </div>
        ))
      )}
    </div>
  );
}
