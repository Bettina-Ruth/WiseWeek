"use client";

import Topbar from "@/components/layout/Topbar";
import { useWiseWeek, realityRating } from "@/context/WiseWeekContext";
import { realityBadgeClasses } from "@/lib/task-colors";
import { DAYS } from "@/lib/date-utils";
import DayColumn from "@/components/planner/DayColumn";
import LastWeekCarryover from "@/components/planner/LastWeekCarryover";
import FutureMessageComposer from "@/components/planner/FutureMessageComposer";

export default function PlannerPage() {
  const { weekDates, todayIdx, totalPlannedHours } = useWiseWeek();
  const planned = totalPlannedHours();
  const rating = realityRating(planned);

  return (
    <>
      <Topbar title="Weekly Planner" sub="Plan the week, not just the day" />
      <div className="flex-1 overflow-y-auto p-7">
        <div className="mb-[18px] flex flex-wrap items-center gap-4">
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${realityBadgeClasses[rating.cls]}`}>
            {rating.icon} {rating.label} — {planned.toFixed(1)}h / 42h
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {DAYS.map((d, i) => (
            <DayColumn key={d} loc={i} label={d} dateLabel={String(weekDates[i].getDate())} isToday={i === todayIdx} />
          ))}
          <DayColumn loc="nextweek" label="Next week" dateLabel="↷" isToday={false} />
        </div>

        <LastWeekCarryover />
        <FutureMessageComposer />
      </div>
    </>
  );
}
