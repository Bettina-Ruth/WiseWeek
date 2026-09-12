"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Topbar from "@/components/layout/Topbar";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { FULL_MONTH_NAMES, MONTH_NAMES, sameYMD } from "@/lib/date-utils";

export default function CalendarPage() {
  const { weekDates, viewCalendarDate } = useWiseWeek();
  const now = useMemo(() => new Date(), []);
  const calStart = useMemo(() => new Date(now.getFullYear(), now.getMonth() - 3, 1), [now]);

  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  function changeMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y--;
    }
    if (m > 11) {
      m = 0;
      y++;
    }
    setViewMonth(m);
    setViewYear(y);
  }

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const leading = Array.from({ length: startWeekday }, (_, i) => daysInPrevMonth - startWeekday + 1 + i);
  const cells = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalCells = startWeekday + daysInMonth;
  const trailing = Array.from({ length: (7 - (totalCells % 7)) % 7 }, (_, i) => i + 1);

  const prevDisabled = viewYear === calStart.getFullYear() && viewMonth === calStart.getMonth();
  const nextDisabled = viewYear === now.getFullYear() && viewMonth === now.getMonth();

  return (
    <>
      <Topbar title="Calendar" sub="Browse any day since you started" />
      <div className="flex-1 overflow-y-auto p-7">
        <div className="card mx-auto max-w-[520px]">
          <div className="mb-5 flex items-center justify-between">
            <button
              disabled={prevDisabled}
              onClick={() => changeMonth(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-surface text-text-dim disabled:opacity-35 hover:border-sage hover:text-text"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="font-display text-lg text-text">
              {FULL_MONTH_NAMES[viewMonth]} {viewYear}
            </div>
            <button
              disabled={nextDisabled}
              onClick={() => changeMonth(1)}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-surface text-text-dim disabled:opacity-35 hover:border-sage hover:text-text"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 text-center font-mono text-[10px] tracking-wide text-text-dim">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-[5px]">
            {leading.map((d, i) => (
              <div key={`lead-${i}`} className="aspect-square rounded-[9px] bg-surface2 opacity-30" />
            ))}
            {cells.map((d) => {
              const dateObj = new Date(viewYear, viewMonth, d);
              const isToday = sameYMD(dateObj, now);
              const inWeek = weekDates.some((wd) => sameYMD(wd, dateObj));
              const disabled = dateObj < calStart || (dateObj > now && !isToday);
              return (
                <button
                  key={d}
                  disabled={disabled}
                  onClick={() => viewCalendarDate(dateObj)}
                  title={`${MONTH_NAMES[viewMonth]} ${d}, ${viewYear}`}
                  className={clsx(
                    "flex aspect-square items-center justify-center rounded-[9px] bg-surface2 font-mono text-[13px] text-text transition-transform hover:-translate-y-px hover:bg-sage-soft",
                    isToday && "bg-sage font-semibold text-[#152014] hover:bg-sage",
                    inWeek && !isToday && "shadow-[inset_0_0_0_1.5px_var(--sage-hover)]",
                    disabled && "pointer-events-none opacity-30"
                  )}
                >
                  {d}
                </button>
              );
            })}
            {trailing.map((d, i) => (
              <div key={`trail-${i}`} className="aspect-square rounded-[9px] bg-surface2 opacity-30" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
