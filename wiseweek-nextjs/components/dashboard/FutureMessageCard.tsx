"use client";

import { useWiseWeek } from "@/context/WiseWeekContext";
import { DAY_NAMES } from "@/lib/date-utils";

export default function FutureMessageCard() {
  const { selectedDay, todayIdx, futureMessages, removeFutureMessage, calendarViewDate } = useWiseWeek();

  const dateLabel =
    calendarViewDate?.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) ??
    (selectedDay === todayIdx ? "today" : DAY_NAMES[selectedDay]);

  const messages = calendarViewDate
    ? []
    : futureMessages
        .map((m, idx) => ({ ...m, idx }))
        .filter((m) => m.day === selectedDay);

  return (
    <div className="card">
      <h3 className="mb-4 font-display text-base text-text">Future Me message — for {dateLabel}</h3>
      {calendarViewDate ? (
        <div className="text-[13px] text-text-dim">No message recorded for this day.</div>
      ) : messages.length === 0 ? null : (
        <div className="flex flex-col gap-2.5">
          {messages.map((m) => (
            <div
              key={m.idx}
              className="relative rounded-xl border-l-[3px] border-sage bg-surface2 p-[18px] font-display italic text-text"
            >
              <span className="mb-1.5 block font-mono text-[10px] not-italic uppercase tracking-wide text-sage-text">
                Dear {DAY_NAMES[m.day]} Me
              </span>
              &quot;{m.text}&quot;
              <button
                onClick={() => removeFutureMessage(m.idx)}
                className="absolute right-3 top-3 text-sm not-italic text-text-dim hover:text-clay"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
