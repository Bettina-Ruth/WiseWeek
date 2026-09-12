import { Task } from "@/types";
import { CATEGORIES } from "./mock-data";

export interface CategoryHoursDatum {
  label: string;
  hours: number;
}

export function categoryHours(weekTasks: Task[][], categories: string[] = CATEGORIES): CategoryHoursDatum[] {
  const map: Record<string, number> = {};
  categories.forEach((c) => (map[c] = 0));
  weekTasks.forEach((day) =>
    day.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + (t.est || 0) / 60;
    })
  );
  return categories.map((c) => ({ label: c, hours: Math.round((map[c] || 0) * 10) / 10 }));
}

export function tierHours(weekTasks: Task[][]) {
  let must = 0;
  let should = 0;
  let nice = 0;
  weekTasks.forEach((day) =>
    day.forEach((t) => {
      const h = (t.est || 0) / 60;
      if (t.tier === "must") must += h;
      else if (t.tier === "should") should += h;
      else nice += h;
    })
  );
  return { must, should, nice };
}

export function dominatingCategoryLabel(data: CategoryHoursDatum[]): string {
  const withHours = data.filter((c) => c.hours > 0);
  if (withHours.length === 0) return "No data yet";
  const sorted = [...withHours].sort((a, b) => b.hours - a.hours);
  const top = sorted[0];
  const total = withHours.reduce((s, c) => s + c.hours, 0);
  const share = Math.round((top.hours / total) * 100);
  if (sorted.length > 1 && share < 30) return "Fairly balanced";
  return `${top.label} is dominating (${share}%)`;
}
