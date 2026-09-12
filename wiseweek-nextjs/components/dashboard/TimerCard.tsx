"use client";

import { useWiseWeek } from "@/context/WiseWeekContext";
import { formatTime } from "@/lib/date-utils";

export default function TimerCard() {
  const { selectedDay, todayIdx, calendarViewDate, focusSeconds, focusRunning, toggleFocusTimer } = useWiseWeek();

  if (calendarViewDate || selectedDay !== todayIdx) return null;

  return (
    <div className="card">
      <h3 className="mb-4 font-display text-base text-text">Timer countdown</h3>
      <div className="flex flex-col items-center py-1">
        <div className="mb-3.5 flex h-[110px] w-[110px] items-center justify-center rounded-full border-[10px] border-surface2 font-mono text-lg" style={{ borderTopColor: "var(--sage)" }}>
          {formatTime(focusSeconds)}
        </div>
        <button
          onClick={toggleFocusTimer}
          className="w-full rounded-full bg-sage px-5 py-2.5 text-sm font-medium text-[#152014] hover:bg-sage-hover"
        >
          {focusRunning ? "Pause focus" : focusSeconds === 0 ? "Restart focus" : "Start focus"}
        </button>
      </div>
    </div>
  );
}
