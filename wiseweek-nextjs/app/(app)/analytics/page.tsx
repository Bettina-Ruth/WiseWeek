"use client";

import Topbar from "@/components/layout/Topbar";
import { useWiseWeek } from "@/context/WiseWeekContext";
import TrendChart from "@/components/analytics/TrendChart";
import WeekOverviewCard from "@/components/analytics/WeekOverviewCard";
import BalanceWheel from "@/components/analytics/BalanceWheel";
import HabitSummaryCard from "@/components/analytics/HabitSummaryCard";
import TimeLeaksCard from "@/components/analytics/TimeLeaksCard";

export default function AnalyticsPage() {
  const { weekTasks, dayMood } = useWiseWeek();

  const completionValues = weekTasks.map((day) => (day.length ? Math.round((day.filter((t) => t.done).length / day.length) * 100) : 0));
  const avgCompletion = Math.round(completionValues.reduce((a, b) => a + b, 0) / completionValues.length);
  const moodValues = dayMood.map((m) => m + 1);
  const avgMoodEmoji = ["😩", "😕", "😐", "🙂", "😄"][Math.round(dayMood.reduce((a, b) => a + b, 0) / dayMood.length)];

  return (
    <>
      <Topbar title="Analytics" sub="" />
      <div className="flex-1 overflow-y-auto p-7">
        <div className="mb-[18px] grid grid-cols-1 gap-[18px] lg:grid-cols-2">
          <TrendChart title="Completion trend" weekValues={completionValues} color="#94B58B" headline={`${avgCompletion}%`} />
          <TrendChart title="Mood trend" weekValues={moodValues} color="#7480A3" headline={avgMoodEmoji} />
        </div>

        <div className="mb-[18px]">
          <WeekOverviewCard />
        </div>
        <div className="mb-[18px]">
          <BalanceWheel />
        </div>
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-2">
          <HabitSummaryCard />
          <TimeLeaksCard />
        </div>
      </div>
    </>
  );
}
