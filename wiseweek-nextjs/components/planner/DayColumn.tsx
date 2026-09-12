"use client";

import { useState } from "react";
import clsx from "clsx";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { useModal } from "@/context/ModalContext";
import { Location } from "@/types";
import PlannerTaskCard from "./PlannerTaskCard";

export default function DayColumn({
  loc,
  label,
  dateLabel,
  isToday,
}: {
  loc: Location;
  label: string;
  dateLabel: string;
  isToday: boolean;
}) {
  const { getBucket, isPastLoc, relocateTask, addTask } = useWiseWeek();
  const { promptInput } = useModal();
  const [dragOver, setDragOver] = useState(false);

  const locked = isPastLoc(loc);
  const tasks = getBucket(loc);

  async function handleAddTask() {
    const val = await promptInput("How long will this task take? (minutes)", "30");
    if (val === null) return;
    addTask(loc, parseInt(val, 10) || 30);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (locked) return;
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain")) as { loc: Location; id: string };
      if (data.loc === loc) return;
      relocateTask(data.loc, data.id, loc);
    } catch {
      /* ignore malformed drag payloads */
    }
  }

  return (
    <div
      onDragOver={(e) => {
        if (locked) return;
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={clsx(
        "rounded-xl border p-3",
        loc === "nextweek" ? "border-dashed bg-surface2" : "bg-surface",
        isToday ? "border-sage" : "border-line",
        dragOver && "border-sage bg-sage-soft"
      )}
    >
      <div className="mb-2.5 flex justify-between font-mono text-[11px] uppercase text-text-dim">
        <span>{label}</span>
        <span>{dateLabel}</span>
      </div>
      {tasks.map((task) => (
        <PlannerTaskCard key={task.id} task={task} loc={loc} />
      ))}
      {!locked && (
        <button
          onClick={handleAddTask}
          className="mt-1 w-full rounded-[9px] border-[1.5px] border-dashed border-line py-2 text-[11.5px] text-text-dim hover:border-sage hover:text-sage-text"
        >
          + Add task
        </button>
      )}
    </div>
  );
}
