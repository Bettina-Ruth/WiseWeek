export const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
export const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
export const FULL_MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Remap JS's Sun=0..Sat=6 to Mon=0..Sun=6, matching the rest of the app. */
export function todayIndex(now: Date = new Date()): number {
  const jsDay = now.getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
}

/** The 7 real calendar dates (Mon..Sun) of the week containing `now`. */
export function currentWeekDates(now: Date = new Date()): Date[] {
  const idx = todayIndex(now);
  const monday = new Date(now);
  monday.setDate(now.getDate() - idx);
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export function sameYMD(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function weekNumber(d: Date): number {
  const oneJan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(
    ((d.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
  );
}

export function weekRangeLabel(weekDates: Date[]): string {
  const start = weekDates[0];
  const end = weekDates[6];
  return `${DAYS[0]} ${MONTH_NAMES[start.getMonth()]} ${start.getDate()} — ${DAYS[6]} ${MONTH_NAMES[end.getMonth()]} ${end.getDate()} · WEEK ${weekNumber(start)}`;
}

export function formatDeadline(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const diffMin = Math.round((d.getTime() - Date.now()) / 60000);
  const past = diffMin < 0;
  const absMin = Math.abs(diffMin);
  const rel =
    absMin < 60
      ? `${absMin}m`
      : absMin < 1440
        ? `${Math.round(absMin / 60)}h`
        : `${Math.round(absMin / 1440)}d`;
  return past ? `overdue by ${rel}` : `in ${rel}`;
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
