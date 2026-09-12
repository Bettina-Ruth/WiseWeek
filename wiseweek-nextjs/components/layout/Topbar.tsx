"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Bell, Sun, Moon, Timer } from "lucide-react";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { formatTime } from "@/lib/date-utils";

const SEARCH_INDEX: { keywords: string[]; href: string }[] = [
  { keywords: ["task", "tasks", "today", "todo"], href: "/dashboard" },
  { keywords: ["mood"], href: "/dashboard" },
  { keywords: ["energy"], href: "/dashboard" },
  { keywords: ["timer", "focus", "countdown"], href: "/dashboard" },
  { keywords: ["future", "message"], href: "/dashboard" },
  { keywords: ["planner", "plan", "deadline"], href: "/planner" },
  { keywords: ["trend", "completion", "overview", "reality", "balance", "wheel", "habit", "leak"], href: "/analytics" },
  { keywords: ["reflection", "insight"], href: "/reflection" },
  { keywords: ["calendar", "history", "browse", "month"], href: "/calendar" },
  { keywords: ["setting", "preference"], href: "/settings" },
  { keywords: ["profile", "streak", "achievement"], href: "/profile" },
  { keywords: ["help", "support"], href: "/help" },
];

export default function Topbar({ title, sub }: { title: string; sub: string }) {
  const { theme, toggleTheme, focusRunning, focusSeconds } = useWiseWeek();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function runSearch() {
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = SEARCH_INDEX.find((entry) => entry.keywords.some((k) => q.includes(k) || k.includes(q)));
    if (match) router.push(match.href);
  }

  return (
    <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-line px-7">
      <div>
        <h2 className="font-display text-[19px] text-text">{title}</h2>
        {sub && <div className="mt-0.5 font-mono text-xs text-text-dim">{sub}</div>}
      </div>
      <div className="flex items-center gap-3.5">
        {focusRunning && (
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-full border border-sage bg-sage-soft px-3 py-1.5 font-mono text-[12.5px] font-semibold text-sage-text"
            title="Click to return to the timer"
          >
            <Timer size={13} /> {formatTime(focusSeconds)}
          </Link>
        )}
        <div className="flex w-[220px] items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-text-dim">
          <Search size={14} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Search the app…"
            className="w-full bg-transparent text-text outline-none placeholder:text-text-dim"
          />
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-surface text-text-dim hover:border-sage hover:text-text">
          <Bell size={15} />
        </button>
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-surface text-text-dim hover:border-sage hover:text-text"
        >
          {theme === "dark" ? <Moon size={15} /> : <Sun size={15} />}
        </button>
        <Link href="/profile">
          <div className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-indigo to-sage text-xs font-semibold text-white">
            SK
          </div>
        </Link>
      </div>
    </div>
  );
}
