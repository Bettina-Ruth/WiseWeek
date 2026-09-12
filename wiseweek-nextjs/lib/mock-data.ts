import { Task, FutureMessage, HabitGoal } from "@/types";

export const CATEGORIES = [
  "Work",
  "Study",
  "Sleep",
  "Exercise",
  "Friends",
  "Family",
  "Hobbies",
  "Reading",
  "Self care",
];

export const AVAILABLE_HOURS = 42;

// day: 0=Mon .. 6=Sun
export const initialWeekTasks: Task[][] = [
  [
    { id: "m1", t: "Ship onboarding v2 to staging", tier: "must", e: "high", est: 90, done: false, category: "Work", deadline: null, reminderLead: null },
    { id: "m2", t: "Standup", tier: "nice", e: "low", est: 15, done: true, category: "Work", deadline: null, reminderLead: null },
  ],
  [
    { id: "t1", t: "Client proposal", tier: "must", e: "high", est: 60, done: false, category: "Work", deadline: null, reminderLead: null },
    { id: "t2", t: "Gym", tier: "nice", e: "low", est: 45, done: false, category: "Exercise", deadline: null, reminderLead: null },
  ],
  [
    { id: "w1", t: "Design review", tier: "should", e: "med", est: 45, done: false, category: "Work", deadline: null, reminderLead: null },
  ],
  [
    { id: "th1", t: "Write launch report — intro & outline", tier: "must", e: "high", est: 60, done: false, category: "Work", deadline: null, reminderLead: null },
    { id: "th2", t: "Reply to client proposal thread", tier: "should", e: "med", est: 30, done: true, category: "Work", deadline: null, reminderLead: null },
    { id: "th3", t: "1:1s", tier: "should", e: "med", est: 30, done: false, category: "Work", deadline: null, reminderLead: null },
  ],
  [
    { id: "f1", t: "Wrap sprint", tier: "should", e: "med", est: 45, done: false, category: "Work", deadline: null, reminderLead: null },
    { id: "f2", t: "Demo", tier: "nice", e: "low", est: 30, done: false, category: "Work", deadline: null, reminderLead: null },
  ],
  [
    { id: "sa1", t: "Rest", tier: "nice", e: "low", est: 60, done: false, category: "Self care", deadline: null, reminderLead: null },
  ],
  [
    { id: "su1", t: "Plan next week", tier: "nice", e: "low", est: 30, done: false, category: "Work", deadline: null, reminderLead: null },
  ],
];

export const initialNextWeekBucket: Task[] = [
  { id: "nw1", t: "Research new apartment listings", tier: "should", e: "med", est: 60, done: false, category: "Family", deadline: null, reminderLead: null },
];

// Demo seed: tasks that were sitting in "Next week" during last week's planning
export const initialLastWeekNextWeek: Task[] = [
  { id: "lw1", t: "Book dentist appointment", tier: "should", e: "low", est: 30, done: false, category: "Self care", deadline: null, reminderLead: null },
  { id: "lw2", t: "Renew passport", tier: "nice", e: "low", est: 45, done: false, category: "Family", deadline: null, reminderLead: null },
];

export const initialDayMood = [2, 3, 2, 3, 4, 3, 4];
export const initialDayEnergy: Array<"low" | "med" | "high"> = [
  "med", "high", "med", "high", "med", "low", "low",
];

export const initialFutureMessages: FutureMessage[] = [
  {
    day: 4,
    text: "Dear Friday Me — the client call went well today. Don't schedule anything heavy right after lunch this week, you'll thank me.",
  },
];

export const initialHabitGoals: HabitGoal[] = [
  { name: "Exercise", target: 5 },
  { name: "Reading", target: 5 },
  { name: "Self care", target: 5 },
];

export const MEMORIES = [
  "Shipped onboarding v2 after 3 weeks of work",
  'First fully "Healthy" week rating',
  "Hit a 7-day planning streak",
  "Reconnected with an old research collaborator",
];

export const ACHIEVEMENTS = [
  "🔥 7-day streak",
  "✍️ 20 reflections written",
  "⚖️ First balanced week",
  "🎯 90% top-3 completion",
];

export const SCORE_HISTORY = [62, 65, 70, 68, 74, 78, 76, 80, 82, 78, 85, 88];
