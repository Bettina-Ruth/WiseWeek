"use client";

import Topbar from "@/components/layout/Topbar";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { weekRangeLabel } from "@/lib/date-utils";
import RealityStrip from "@/components/dashboard/RealityStrip";
import DayTasksCard from "@/components/dashboard/DayTasksCard";
import MoodCard from "@/components/dashboard/MoodCard";
import EnergyCard from "@/components/dashboard/EnergyCard";
import TimerCard from "@/components/dashboard/TimerCard";
import FutureMessageCard from "@/components/dashboard/FutureMessageCard";

export default function DashboardPage() {
  const { weekDates } = useWiseWeek();

  return (
    <>
      <Topbar title="Dashboard" sub={weekRangeLabel(weekDates)} />
      <div className="flex-1 overflow-y-auto p-7">
        <RealityStrip />

        <div className="mb-[18px] grid grid-cols-1 items-start gap-[18px] lg:grid-cols-[2fr_1fr]">
          <DayTasksCard />
          <div className="flex flex-col gap-4">
            <MoodCard />
            <EnergyCard />
            <TimerCard />
          </div>
        </div>

        <FutureMessageCard />
      </div>
    </>
  );
}
