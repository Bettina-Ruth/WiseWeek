"use client";

import { Zap } from "lucide-react";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { useAntiProc } from "@/context/AntiProcContext";
import { DAY_NAMES, MONTH_NAMES } from "@/lib/date-utils";
import DayTaskRow from "./DayTaskRow";

export default function DayTasksCard() {
  const { selectedDay, todayIdx, weekTasks, toggleTaskDone, calendarViewDate, getFocusTask } = useWiseWeek();
  const { open } = useAntiProc();

  if (calendarViewDate) {
    const dateLabel = `${DAY_NAMES[(calendarViewDate.getDay() + 6) % 7]}, ${MONTH_NAMES[calendarViewDate.getMonth()]} ${calendarViewDate.getDate()}, ${calendarViewDate.getFullYear()}`;
    return (
      <div className="card">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base text-text">{dateLabel}</h3>
          <span className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[10.5px] uppercase text-text-dim">
            Outside tracked week
          </span>
        </div>
        <div className="py-5 text-center text-[13px] text-text-dim">
          No task data recorded for this day in the prototype — only the current week is tracked live.
        </div>
      </div>
    );
  }

  const isPast = selectedDay < todayIdx;
  const items = weekTasks[selectedDay] ?? [];
  const open_count = items.filter((t) => !t.done).length;

  const title =
    selectedDay === todayIdx
      ? "Today's tasks"
      : isPast
        ? `What you completed on ${DAY_NAMES[selectedDay]}`
        : `${DAY_NAMES[selectedDay]}'s planned tasks`;

  const tag =
    selectedDay === todayIdx ? `${open_count} open · Focus` : `${open_count} open · ${items.length} total`;

  return (
    <div className="card">
      <div className="mb-4 flex items-center justify-between gap-2.5">
        <h3 className="font-display text-base text-text">{title}</h3>
        <div className="flex items-center gap-2.5">
          <span className="rounded-md bg-surface2 px-2.5 py-1 font-mono text-[10.5px] uppercase text-text-dim">{tag}</span>
          <button
            onClick={() => open(getFocusTask(selectedDay)?.t ?? "Your next task")}
            className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs text-text hover:border-sage"
          >
            <Zap size={12} /> Anti-procrastination
          </button>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="py-6 text-center text-[13px] text-text-dim">Nothing planned for this day yet.</div>
      ) : (
        <div>
          {items.map((task) => (
            <DayTaskRow
              key={task.id}
              task={task}
              pastDue={isPast && !task.done}
              onToggle={() => toggleTaskDone(selectedDay, task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
