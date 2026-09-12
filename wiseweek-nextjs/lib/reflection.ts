import { Task, TimeLeak } from "@/types";
import { DAY_NAMES } from "./date-utils";
import { AVAILABLE_HOURS } from "./mock-data";
import { categoryHours } from "./analytics-utils";
import { realityRating } from "./task-colors";

export interface Insight {
  icon: string;
  title: string;
  detail: string;
}

export function computeReflectionInsights(
  weekTasks: Task[][],
  dayMood: number[],
  timeLeaks: TimeLeak[],
  categories: string[]
): Insight[] {
  const insights: Insight[] = [];
  const rates = weekTasks.map((day) => (day.length ? day.filter((t) => t.done).length / day.length : null));

  let bestIdx = -1;
  let worstIdx = -1;
  let bestRate = -1;
  let worstRate = 2;
  rates.forEach((r, i) => {
    if (r === null) return;
    if (r > bestRate) {
      bestRate = r;
      bestIdx = i;
    }
    if (r < worstRate) {
      worstRate = r;
      worstIdx = i;
    }
  });
  if (bestIdx > -1 && worstIdx > -1 && bestIdx !== worstIdx) {
    insights.push({
      icon: "☀",
      title: `${DAY_NAMES[bestIdx]} is your strongest day.`,
      detail: `${Math.round(bestRate * 100)}% of ${DAY_NAMES[bestIdx]}'s tasks are done, your best completion rate this week.`,
    });
    insights.push({
      icon: "📉",
      title: `${DAY_NAMES[worstIdx]} is lagging behind.`,
      detail: `Only ${Math.round(worstRate * 100)}% of ${DAY_NAMES[worstIdx]}'s tasks are complete so far.`,
    });
  }

  let lowMoodDay = -1;
  let lowMood = 99;
  dayMood.forEach((m, i) => {
    if (m < lowMood) {
      lowMood = m;
      lowMoodDay = i;
    }
  });
  if (lowMoodDay > -1) {
    const rate = rates[lowMoodDay];
    insights.push({
      icon: "💭",
      title: `Your mood dipped on ${DAY_NAMES[lowMoodDay]}.`,
      detail:
        rate != null
          ? `Completion that day sits at ${Math.round(rate * 100)}% — worth watching if this repeats.`
          : "No tasks logged that day yet to compare against.",
    });
  }

  const cats = categoryHours(weekTasks, categories)
    .filter((c) => c.hours > 0)
    .sort((a, b) => b.hours - a.hours);
  if (cats.length > 0) {
    insights.push({
      icon: "⚖️",
      title: `Most of your week is going to ${cats[0].label}.`,
      detail: `${cats[0].label} accounts for ${cats[0].hours}h planned this week${
        cats.length > 1 ? `, versus ${cats[1].hours}h on ${cats[1].label}` : ""
      }.`,
    });
  }

  let plannedMin = 0;
  weekTasks.forEach((day) => day.forEach((t) => (plannedMin += t.est || 0)));
  const planned = plannedMin / 60;
  const rating = realityRating(planned);
  insights.push({
    icon: "⏱",
    title: `This is shaping up to be a ${rating.label.toLowerCase()}.`,
    detail: `${planned.toFixed(1)}h planned against ${AVAILABLE_HOURS}h available (${Math.round((planned / AVAILABLE_HOURS) * 100)}% of your week).`,
  });

  if (timeLeaks.length > 0) {
    const worst = [...timeLeaks].sort((a, b) => b.hours - a.hours)[0];
    insights.push({
      icon: "🕳️",
      title: `${worst.label} is your biggest logged time leak.`,
      detail: `You've tracked ${worst.hours}h lost to ${worst.label.toLowerCase()} this week.`,
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: "✦",
      title: "Not enough data yet.",
      detail: "Add a few tasks, moods, and categories in the Planner and Dashboard, and your reflection will build itself from that.",
    });
  }

  return insights;
}
