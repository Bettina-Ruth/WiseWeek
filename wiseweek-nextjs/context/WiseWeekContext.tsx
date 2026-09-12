"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import {
  Task,
  Tier,
  Energy,
  Location,
  FutureMessage,
  TimeLeak,
  HabitGoal,
  ThemeMode,
} from "@/types";
import {
  CATEGORIES,
  initialWeekTasks,
  initialNextWeekBucket,
  initialLastWeekNextWeek,
  initialDayMood,
  initialDayEnergy,
  initialFutureMessages,
  initialHabitGoals,
} from "@/lib/mock-data";
import { todayIndex, currentWeekDates, sameYMD, formatDeadline } from "@/lib/date-utils";
import { realityRating } from "@/lib/task-colors";

interface Toast {
  id: number;
  message: string;
}

interface WiseWeekState {
  // theme
  theme: ThemeMode;
  toggleTheme: () => void;

  // dates
  todayIdx: number;
  weekDates: Date[];

  // navigation
  selectedDay: number;
  selectDay: (i: number) => void;
  calendarViewDate: Date | null;
  viewCalendarDate: (d: Date) => void;

  // tasks
  weekTasks: Task[][];
  nextWeekBucket: Task[];
  lastWeekNextWeek: Task[];
  categories: string[];
  getBucket: (loc: Location) => Task[];
  isPastLoc: (loc: Location) => boolean;
  toggleTaskDone: (loc: Location, id: string) => void;
  setTier: (loc: Location, id: string, value: Tier) => void;
  setEnergy: (loc: Location, id: string, value: Energy) => void;
  setCategory: (loc: Location, id: string, value: string) => void;
  addCategory: (name: string) => void;
  addTask: (loc: Location, est: number) => void;
  removeTask: (loc: Location, id: string) => void;
  updateTaskTitle: (loc: Location, id: string, title: string) => void;
  moveForward: (loc: Location, id: string) => void;
  relocateTask: (fromLoc: Location, id: string, toLoc: Location) => void;
  setDeadline: (loc: Location, id: string, value: string) => void;
  setReminderLead: (loc: Location, id: string, value: number | null) => void;
  setTaskEstimate: (loc: Location, id: string, est: number) => void;
  pullFromLastWeek: (index: number) => void;
  countMustTasks: (excludeLoc?: Location, excludeId?: string) => number;
  totalPlannedHours: () => number;
  getFocusTask: (dayIdx: number) => Task | undefined;

  // mood / energy check-in
  dayMood: number[];
  setMood: (day: number, index: number) => void;
  dayEnergyCheckin: Energy[];
  setEnergyCheckin: (day: number, value: Energy) => void;

  // future messages
  futureMessages: FutureMessage[];
  addFutureMessage: (day: number, text: string) => void;
  removeFutureMessage: (index: number) => void;

  // time leaks
  timeLeaks: TimeLeak[];
  addTimeLeak: (label: string, hours: number) => void;
  removeTimeLeak: (index: number) => void;

  // habit goals
  habitGoals: HabitGoal[];
  addHabitGoal: (name: string, target: number) => void;
  removeHabitGoal: (index: number) => void;
  habitDoneCount: (name: string) => number;

  // focus timer
  focusSeconds: number;
  focusRunning: boolean;
  toggleFocusTimer: () => void;

  // toasts
  toasts: Toast[];
  showToast: (message: string) => void;
}

const WiseWeekContext = createContext<WiseWeekState | null>(null);

export function WiseWeekProvider({ children }: { children: ReactNode }) {
  // Real "today" — computed once per session, matching the prototype's real-time-day behavior.
  const now = useMemo(() => new Date(), []);
  const todayIdx = useMemo(() => todayIndex(now), [now]);
  const weekDates = useMemo(() => currentWeekDates(now), [now]);

  const [theme, setTheme] = useState<ThemeMode>("light");
  const [selectedDay, setSelectedDay] = useState(todayIdx);
  const [calendarViewDate, setCalendarViewDate] = useState<Date | null>(null);

  const [weekTasks, setWeekTasks] = useState<Task[][]>(initialWeekTasks);
  const [nextWeekBucket, setNextWeekBucket] = useState<Task[]>(initialNextWeekBucket);
  const [lastWeekNextWeek, setLastWeekNextWeek] = useState<Task[]>(initialLastWeekNextWeek);
  const [categories, setCategories] = useState<string[]>(CATEGORIES);

  const [dayMood, setDayMood] = useState<number[]>(initialDayMood);
  const [dayEnergyCheckin, setDayEnergyCheckin] = useState<Energy[]>(initialDayEnergy);

  const [futureMessages, setFutureMessages] = useState<FutureMessage[]>(initialFutureMessages);
  const [timeLeaks, setTimeLeaks] = useState<TimeLeak[]>([]);
  const [habitGoals, setHabitGoals] = useState<HabitGoal[]>(initialHabitGoals);

  const [focusSeconds, setFocusSeconds] = useState(24 * 60 + 10);
  const [focusRunning, setFocusRunning] = useState(false);
  const focusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const idCounter = useRef(100);
  const nextTaskId = useCallback(() => `t${idCounter.current++}`, []);

  // ---- Theme ----
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  // ---- Toasts ----
  const showToast = useCallback((message: string) => {
    const id = toastIdRef.current++;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  }, []);

  // ---- Bucket helpers ----
  const getBucket = useCallback(
    (loc: Location): Task[] => {
      if (loc === "nextweek") return nextWeekBucket;
      return weekTasks[loc] ?? [];
    },
    [weekTasks, nextWeekBucket]
  );
  const isPastLoc = useCallback((loc: Location) => typeof loc === "number" && loc < todayIdx, [todayIdx]);

  const setBucket = useCallback((loc: Location, updater: (arr: Task[]) => Task[]) => {
    if (loc === "nextweek") {
      setNextWeekBucket((prev) => updater(prev));
    } else {
      setWeekTasks((prev) => prev.map((day, i) => (i === loc ? updater(day) : day)));
    }
  }, []);

  const updateTask = useCallback(
    (loc: Location, id: string, patch: Partial<Task>) => {
      setBucket(loc, (arr) => arr.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    },
    [setBucket]
  );

  // ---- Navigation ----
  const selectDay = useCallback((i: number) => {
    setCalendarViewDate(null);
    setSelectedDay(i);
  }, []);
  const viewCalendarDate = useCallback(
    (d: Date) => {
      const matchIdx = weekDates.findIndex((wd) => sameYMD(wd, d));
      if (matchIdx !== -1) {
        selectDay(matchIdx);
        return;
      }
      setCalendarViewDate(d);
    },
    [weekDates, selectDay]
  );

  // ---- Must-task cap: only counts INCOMPLETE must tasks ----
  const countMustTasks = useCallback(
    (excludeLoc?: Location, excludeId?: string) => {
      let n = 0;
      const scan = (arr: Task[], loc: Location) =>
        arr.forEach((t) => {
          if (loc === excludeLoc && t.id === excludeId) return;
          if (t.tier === "must" && !t.done) n++;
        });
      weekTasks.forEach((day, i) => scan(day, i));
      scan(nextWeekBucket, "nextweek");
      return n;
    },
    [weekTasks, nextWeekBucket]
  );

  const toggleTaskDone = useCallback(
    (loc: Location, id: string) => {
      const task = getBucket(loc).find((t) => t.id === id);
      if (!task) return;
      updateTask(loc, id, { done: !task.done });
    },
    [getBucket, updateTask]
  );

  const setTier = useCallback(
    (loc: Location, id: string, value: Tier) => {
      if (value === "must" && countMustTasks(loc, id) >= 3) {
        showToast("Only 3 Must tasks are allowed at once — finish or downgrade one first.");
        return;
      }
      updateTask(loc, id, { tier: value });
    },
    [countMustTasks, updateTask, showToast]
  );

  const setEnergy = useCallback(
    (loc: Location, id: string, value: Energy) => updateTask(loc, id, { e: value }),
    [updateTask]
  );

  const addCategory = useCallback((name: string) => {
    setCategories((prev) => (prev.includes(name) ? prev : [...prev, name]));
  }, []);

  const setCategory = useCallback(
    (loc: Location, id: string, value: string) => updateTask(loc, id, { category: value }),
    [updateTask]
  );

  const addTask = useCallback(
    (loc: Location, est: number) => {
      if (isPastLoc(loc)) {
        showToast("You can't add new tasks to a past day — only postponing existing ones is allowed.");
        return;
      }
      const newTask: Task = {
        id: nextTaskId(),
        t: "New task",
        tier: "nice",
        e: "low",
        est: Math.max(5, est || 30),
        done: false,
        category: "Work",
        deadline: null,
        reminderLead: null,
      };
      setBucket(loc, (arr) => [...arr, newTask]);
    },
    [isPastLoc, showToast, nextTaskId, setBucket]
  );

  const removeTask = useCallback(
    (loc: Location, id: string) => {
      if (isPastLoc(loc)) return;
      setBucket(loc, (arr) => arr.filter((t) => t.id !== id));
    },
    [isPastLoc, setBucket]
  );

  const updateTaskTitle = useCallback(
    (loc: Location, id: string, title: string) => {
      if (isPastLoc(loc)) return;
      updateTask(loc, id, { t: title.trim() || "Untitled task" });
    },
    [isPastLoc, updateTask]
  );

  const relocateTask = useCallback(
    (fromLoc: Location, id: string, toLoc: Location) => {
      const fromArr = getBucket(fromLoc);
      const task = fromArr.find((t) => t.id === id);
      if (!task) return;
      const movedTask: Task = { ...task, deadline: null, reminded: false };
      setBucket(fromLoc, (arr) => arr.filter((t) => t.id !== id));
      setBucket(toLoc, (arr) => [...arr, movedTask]);
    },
    [getBucket, setBucket]
  );

  const moveForward = useCallback(
    (loc: Location, id: string) => {
      const dayIdx = loc as number;
      const toLoc: Location = loc === "nextweek" ? "nextweek" : dayIdx < todayIdx ? todayIdx : dayIdx === 6 ? "nextweek" : dayIdx + 1;
      relocateTask(loc, id, toLoc);
    },
    [todayIdx, relocateTask]
  );

  const setDeadline = useCallback(
    (loc: Location, id: string, value: string) => {
      updateTask(loc, id, { deadline: value || null, reminded: false });
      const task = getBucket(loc).find((t) => t.id === id);
      if (value) {
        showToast(`⏰ Deadline set for "${task?.t ?? "task"}" — ${formatDeadline(value)}.`);
      }
    },
    [updateTask, getBucket, showToast]
  );

  const setReminderLead = useCallback(
    (loc: Location, id: string, value: number | null) => {
      updateTask(loc, id, { reminderLead: value, reminded: false });
      showToast(`Reminder set: ${!value ? "at the deadline" : "before the deadline"}.`);
    },
    [updateTask, showToast]
  );

  const setTaskEstimate = useCallback(
    (loc: Location, id: string, est: number) => {
      updateTask(loc, id, { est: Math.max(5, est) });
    },
    [updateTask]
  );

  const pullFromLastWeek = useCallback((index: number) => {
    setLastWeekNextWeek((prev) => {
      const task = prev[index];
      if (!task) return prev;
      const moved = { ...task, deadline: null, reminded: false };
      setWeekTasks((wt) => wt.map((day, i) => (i === todayIdx ? [...day, moved] : day)));
      return prev.filter((_, i) => i !== index);
    });
  }, [todayIdx]);

  const totalPlannedHours = useCallback(() => {
    let mins = 0;
    weekTasks.forEach((day) => day.forEach((t) => (mins += t.est || 0)));
    return mins / 60;
  }, [weekTasks]);

  const getFocusTask = useCallback(
    (dayIdx: number) => {
      const list = weekTasks[dayIdx] ?? [];
      return list.find((t) => t.tier === "must" && !t.done) ?? list.find((t) => !t.done) ?? list[0];
    },
    [weekTasks]
  );

  // ---- Mood / energy check-in ----
  const setMood = useCallback((day: number, index: number) => {
    setDayMood((prev) => prev.map((m, i) => (i === day ? index : m)));
  }, []);
  const setEnergyCheckin = useCallback((day: number, value: Energy) => {
    setDayEnergyCheckin((prev) => prev.map((e, i) => (i === day ? value : e)));
  }, []);

  // ---- Future messages ----
  const addFutureMessage = useCallback((day: number, text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setFutureMessages((prev) => [...prev, { day, text: clean }]);
  }, []);
  const removeFutureMessage = useCallback((index: number) => {
    setFutureMessages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ---- Time leaks (merge duplicate labels, cap at 24h) ----
  const addTimeLeak = useCallback(
    (label: string, hours: number) => {
      const clean = label.trim();
      if (!clean || !hours || hours <= 0) return;
      const cappedHours = Math.min(hours, 24);
      setTimeLeaks((prev) => {
        const idx = prev.findIndex((l) => l.label.toLowerCase() === clean.toLowerCase());
        if (idx !== -1) {
          const merged = Math.min(24, Math.round((prev[idx].hours + cappedHours) * 10) / 10);
          showToast(`Added ${cappedHours}h to "${prev[idx].label}" — now ${merged}h total.`);
          return prev.map((l, i) => (i === idx ? { ...l, hours: merged } : l));
        }
        return [...prev, { label: clean, hours: cappedHours }];
      });
    },
    [showToast]
  );
  const removeTimeLeak = useCallback((index: number) => {
    setTimeLeaks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ---- Habit goals ----
  const habitDoneCount = useCallback(
    (name: string) => {
      let done = 0;
      weekTasks.forEach((day) =>
        day.forEach((t) => {
          if (t.category === name && t.done) done++;
        })
      );
      return done;
    },
    [weekTasks]
  );
  const addHabitGoal = useCallback(
    (name: string, target: number) => {
      const clean = name.trim();
      if (!clean || !target || target <= 0) return;
      setHabitGoals((prev) => {
        const idx = prev.findIndex((h) => h.name.toLowerCase() === clean.toLowerCase());
        if (idx !== -1) {
          showToast(`Updated "${prev[idx].name}" target to ${target} tasks.`);
          return prev.map((h, i) => (i === idx ? { ...h, target } : h));
        }
        return [...prev, { name: clean, target }];
      });
      addCategory(clean);
    },
    [showToast, addCategory]
  );
  const removeHabitGoal = useCallback((index: number) => {
    setHabitGoals((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ---- Focus timer ----
  const toggleFocusTimer = useCallback(() => {
    setFocusRunning((running) => {
      if (!running && focusSeconds === 0) {
        setFocusSeconds(24 * 60 + 10);
      }
      return !running;
    });
  }, [focusSeconds]);

  useEffect(() => {
    if (!focusRunning) {
      if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
      return;
    }
    focusIntervalRef.current = setInterval(() => {
      setFocusSeconds((s) => {
        if (s <= 1) {
          setFocusRunning(false);
          showToast("⏱ Focus timer finished.");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
    };
  }, [focusRunning, showToast]);

  // ---- Deadline reminders (checked every 5s, matching the prototype) ----
  useEffect(() => {
    const check = () => {
      const nowMs = Date.now();
      const allTasks = [...weekTasks.flat(), ...nextWeekBucket];
      allTasks.forEach((t) => {
        if (t.deadline && !t.done && !t.reminded) {
          const lead = (t.reminderLead || 0) * 60000;
          const fireAt = new Date(t.deadline).getTime() - lead;
          if (nowMs >= fireAt) {
            t.reminded = true; // mutate in place to avoid re-render storms; harmless for a mock
            const leadTxt = t.reminderLead
              ? ` (reminder: ${t.reminderLead >= 60 ? Math.round(t.reminderLead / 60) + "h" : t.reminderLead + "m"} before)`
              : "";
            showToast(`⏰ "${t.t}"${leadTxt} — ${formatDeadline(t.deadline)}`);
          }
        }
      });
    };
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, [weekTasks, nextWeekBucket, showToast]);

  const value: WiseWeekState = {
    theme,
    toggleTheme,
    todayIdx,
    weekDates,
    selectedDay,
    selectDay,
    calendarViewDate,
    viewCalendarDate,
    weekTasks,
    nextWeekBucket,
    lastWeekNextWeek,
    categories,
    getBucket,
    isPastLoc,
    toggleTaskDone,
    setTier,
    setEnergy,
    setCategory,
    addCategory,
    addTask,
    removeTask,
    updateTaskTitle,
    moveForward,
    relocateTask,
    setDeadline,
    setReminderLead,
    setTaskEstimate,
    pullFromLastWeek,
    countMustTasks,
    totalPlannedHours,
    getFocusTask,
    dayMood,
    setMood,
    dayEnergyCheckin,
    setEnergyCheckin,
    futureMessages,
    addFutureMessage,
    removeFutureMessage,
    timeLeaks,
    addTimeLeak,
    removeTimeLeak,
    habitGoals,
    addHabitGoal,
    removeHabitGoal,
    habitDoneCount,
    focusSeconds,
    focusRunning,
    toggleFocusTimer,
    toasts,
    showToast,
  };

  return <WiseWeekContext.Provider value={value}>{children}</WiseWeekContext.Provider>;
}

export function useWiseWeek() {
  const ctx = useContext(WiseWeekContext);
  if (!ctx) throw new Error("useWiseWeek must be used within a WiseWeekProvider");
  return ctx;
}

export { realityRating };
