"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Rows3, BarChart3, Sparkles, CalendarDays, Settings, Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { DAYS } from "@/lib/date-utils";

const LOADS = [70, 85, 60, 95, 40, 20, 15]; // decorative planned-load fill per day, matching the prototype

const navItems = [
  { href: "/dashboard", label: "Dashboard", Icon: LayoutGrid },
  { href: "/planner", label: "Weekly Planner", Icon: Rows3 },
  { href: "/analytics", label: "Analytics", Icon: BarChart3 },
  { href: "/reflection", label: "Reflection", Icon: Sparkles },
  { href: "/calendar", label: "Calendar", Icon: CalendarDays },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export default function Spine() {
  const pathname = usePathname();
  const { theme, toggleTheme, todayIdx, selectedDay, weekTasks, viewCalendarDate, weekDates } = useWiseWeek();

  function dayHasIncomplete(i: number) {
    return weekTasks[i]?.some((t) => !t.done) ?? false;
  }

  return (
    <div className="flex w-[76px] flex-shrink-0 flex-col items-center border-r border-line bg-surface py-5">
      <Link href="/">
        <div className="mb-6 h-[26px] w-[26px] cursor-pointer rounded-md bg-gradient-to-br from-sage to-clay" />
      </Link>

      <div className="mb-7 flex flex-col gap-[7px]">
        {DAYS.map((d, i) => {
          const isToday = i === todayIdx;
          const isSelected = i === selectedDay && !isToday;
          const pastDue = i < todayIdx && dayHasIncomplete(i);
          return (
            <div
              key={d}
              onClick={() => viewCalendarDate(weekDates[i])}
              title={`${d} · ${LOADS[i]}% planned${pastDue ? " · past due" : ""}`}
              className={clsx(
                "relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center overflow-hidden rounded-[9px] border bg-surface2",
                isToday && "border-sage",
                isSelected && "border-sage-hover",
                !isToday && !isSelected && "border-transparent"
              )}
            >
              <div
                className={clsx("absolute bottom-0 left-0 right-0", LOADS[i] > 90 ? "bg-clay-soft" : "bg-sage-soft")}
                style={{ height: `${LOADS[i]}%` }}
              />
              <span className={clsx("relative z-10 font-mono text-[9px]", isToday ? "text-sage-text" : "text-text-dim")}>
                {d[0]}
              </span>
              {pastDue && (
                <div className="absolute -top-1 -right-1 z-20 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-clay text-[8px] font-bold text-white">
                  ✕
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link key={href} href={href} title={label}>
              <div
                className={clsx(
                  "flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors",
                  active ? "bg-sage-soft text-sage-text" : "text-text-dim hover:bg-surface2 hover:text-text"
                )}
              >
                <Icon size={17} strokeWidth={1.8} />
              </div>
            </Link>
          );
        })}
      </div>

      <button
        onClick={toggleTheme}
        title="Toggle theme"
        className="flex h-10 w-10 items-center justify-center rounded-[10px] text-text-dim hover:bg-surface2 hover:text-text"
      >
        {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </button>
    </div>
  );
}
