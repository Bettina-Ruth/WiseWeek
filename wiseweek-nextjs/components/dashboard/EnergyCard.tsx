"use client";

import clsx from "clsx";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { Energy } from "@/types";

const OPTIONS: { value: Energy; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "med", label: "Medium" },
  { value: "high", label: "High" },
];

export default function EnergyCard() {
  const { selectedDay, todayIdx, dayEnergyCheckin, setEnergyCheckin, calendarViewDate } = useWiseWeek();

  if (calendarViewDate) return null;

  const isToday = selectedDay === todayIdx;
  const isFuture = selectedDay > todayIdx;

  if (!isToday) {
    return (
      <div className="card">
        <h3 className="mb-4 font-display text-base text-text">Energy that day</h3>
        {isFuture ? (
          <div className="text-[13px] text-text-dim">Not logged yet.</div>
        ) : (
          <>
            <span
              className="rounded-md px-3.5 py-1.5 text-[13px]"
              style={{
                background: `var(--pri-${dayEnergyCheckin[selectedDay] === "high" ? "must" : dayEnergyCheckin[selectedDay] === "med" ? "should" : "nice"}-bg)`,
                color: "var(--pri-text)",
              }}
            >
              {dayEnergyCheckin[selectedDay]}
            </span>
            <p className="hint mt-2">Locked — past days can&apos;t be changed.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="mb-4 font-display text-base text-text">Energy check</h3>
      <p className="hint mb-2.5">How&apos;s your energy right now?</p>
      <div className="flex gap-2">
        {OPTIONS.map((opt) => {
          const selected = dayEnergyCheckin[selectedDay] === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setEnergyCheckin(selectedDay, opt.value)}
              className={clsx("flex-1 rounded-[9px] py-2.5 text-[12.5px] border-[1.5px]", !selected && "border-transparent bg-surface2 text-text-dim")}
              style={
                selected
                  ? {
                      background: `var(--pri-${opt.value === "high" ? "must" : opt.value === "med" ? "should" : "nice"}-bg)`,
                      color: "var(--pri-text)",
                      borderColor: "transparent",
                    }
                  : undefined
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
