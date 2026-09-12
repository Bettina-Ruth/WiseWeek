export type Tier = "must" | "should" | "nice";
export type Energy = "low" | "med" | "high";
export type Location = number | "nextweek"; // 0-6 = day index (Mon..Sun), or the "Next week" holding bucket

export interface Task {
  id: string;
  t: string; // title
  tier: Tier;
  e: Energy;
  est: number; // duration in minutes
  done: boolean;
  category: string;
  deadline: string | null; // datetime-local value
  reminderLead: number | null; // minutes before deadline to remind; null = "at deadline"
  reminded?: boolean;
}

export interface FutureMessage {
  day: number; // 0-6, which day this message is meant for
  text: string;
}

export interface TimeLeak {
  label: string;
  hours: number;
}

export interface HabitGoal {
  name: string;
  target: number;
}

export interface CategoryHours {
  label: string;
  hours: number;
}

export type ThemeMode = "light" | "dark";

export type TrendRange = "week" | "month" | "all";

export interface RealityRating {
  cls: "healthy" | "busy" | "impossible";
  label: string;
  icon: string;
}
