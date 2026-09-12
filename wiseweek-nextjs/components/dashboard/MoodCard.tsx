"use client";

import clsx from "clsx";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { DAY_NAMES } from "@/lib/date-utils";

const MOODS = ["😩", "😕", "😐", "🙂", "😄"];

export default function MoodCard() {
  const { selectedDay, todayIdx, dayMood, setMood, calendarViewDate } = useWiseWeek();

  if (calendarViewDate) return null;

  const isToday = selectedDay === todayIdx;
  const isFuture = selectedDay > todayIdx;

  if (!isToday) {
    return (
      <div className="card">
        <h3 className="mb-4 font-display text-base text-text">Mood that day</h3>
        {isFuture ? (
          <div className="text-[13px] text-text-dim">Not logged yet.</div>
        ) : (
          <>
            <div className="text-3xl leading-none">{MOODS[dayMood[selectedDay]]}</div>
            <p className="hint mt-2">Locked — past days can&apos;t be changed.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="mb-4 font-display text-base text-text">Mood check</h3>
      <div className="flex gap-2">
        {MOODS.map((m, i) => (
          <button
            key={m}
            onClick={() => setMood(selectedDay, i)}
            className={clsx(
              "flex h-[42px] w-[42px] items-center justify-center rounded-xl border-[1.5px] text-lg",
              dayMood[selectedDay] === i ? "border-sage bg-sage-soft" : "border-transparent bg-surface2"
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <p className="hint mt-3">{isToday ? "Mood logged for today." : `Mood logged for ${DAY_NAMES[selectedDay]}.`}</p>
    </div>
  );
}
