"use client";

import { useState } from "react";
import clsx from "clsx";
import { Clock, ArrowRight, X as XIcon, Pencil } from "lucide-react";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { useModal } from "@/context/ModalContext";
import { Task, Location, Tier, Energy } from "@/types";
import { taskGradient, taskBorderColor } from "@/lib/task-colors";
import { formatDeadline } from "@/lib/date-utils";

export default function PlannerTaskCard({ task, loc }: { task: Task; loc: Location }) {
  const {
    isPastLoc,
    setTier,
    setEnergy,
    setCategory,
    addCategory,
    categories,
    updateTaskTitle,
    removeTask,
    moveForward,
    setDeadline,
    setReminderLead,
    setTaskEstimate,
  } = useWiseWeek();
  const { promptInput } = useModal();
  const [deadlineOpen, setDeadlineOpen] = useState(false);

  const locked = isPastLoc(loc);
  const overdue = task.deadline && !task.done && new Date(task.deadline) < new Date();
  const showForward = loc !== "nextweek" && !task.done;

  async function handleCategoryChange(value: string) {
    if (value === "__new__") {
      const name = await promptInput("Name your new category", "");
      if (name && name.trim()) {
        addCategory(name.trim());
        setCategory(loc, task.id, name.trim());
      }
      return;
    }
    setCategory(loc, task.id, value);
  }

  async function handleEditDuration() {
    const val = await promptInput("How long will this task take? (minutes)", String(task.est || 30));
    if (val === null) return;
    const est = Math.max(5, parseInt(val, 10) || task.est || 30);
    setTaskEstimate(loc, task.id, est);
  }

  return (
    <div
      draggable={!locked || !task.done}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({ loc, id: task.id }));
      }}
      className={clsx(
        "mb-2 rounded-[9px] border-l-[3px] p-2.5 text-[12.5px] transition-transform",
        !locked && "cursor-grab active:cursor-grabbing",
        locked && "opacity-80"
      )}
      style={{ background: taskGradient(task.tier, task.e), borderLeftColor: taskBorderColor(task.tier), color: "var(--pri-text)" }}
    >
      {locked ? (
        <div className="text-[var(--pri-text)]">{task.t}</div>
      ) : (
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateTaskTitle(loc, task.id, e.currentTarget.textContent || "")}
          className="cursor-text rounded outline-none focus:bg-white/40"
        >
          {task.t}
        </div>
      )}

      {task.deadline && (
        <div className={clsx("mt-1.5 font-medium opacity-80", overdue && "font-bold opacity-100")}>
          ⏰ {formatDeadline(task.deadline)}
        </div>
      )}
      {locked && !task.done && (
        <div className="mt-1.5 inline-block rounded-md bg-clay px-1.5 py-0.5 text-[9.5px] font-semibold text-white">
          ✕ Past due
        </div>
      )}

      <div className="mt-1.5 flex flex-wrap gap-1">
        <select
          disabled={locked}
          value={task.tier}
          onChange={(e) => setTier(loc, task.id, e.target.value as Tier)}
          className="max-w-[74px] rounded-md border border-line bg-menu-bg px-1 py-0.5 font-mono text-[9px] text-menu-text disabled:opacity-70"
        >
          <option value="must">Must</option>
          <option value="should">Should</option>
          <option value="nice">Nice</option>
        </select>
        <select
          disabled={locked}
          value={task.e}
          onChange={(e) => setEnergy(loc, task.id, e.target.value as Energy)}
          className="max-w-[74px] rounded-md border border-line bg-menu-bg px-1 py-0.5 font-mono text-[9px] text-menu-text disabled:opacity-70"
        >
          <option value="high">High</option>
          <option value="med">Med</option>
          <option value="low">Low</option>
        </select>
        <select
          disabled={locked}
          value={task.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="max-w-[84px] rounded-md border border-line bg-menu-bg px-1 py-0.5 font-mono text-[9px] text-menu-text disabled:opacity-70"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="__new__">+ New…</option>
        </select>
      </div>

      <div className="mt-1.5 flex items-center justify-between">
        <button
          disabled={locked}
          onClick={handleEditDuration}
          className="flex items-center gap-0.5 font-mono text-[9.5px] opacity-60 hover:opacity-100 disabled:pointer-events-none"
        >
          {task.est || 0}m <Pencil size={9} />
        </button>
        <div className="flex items-center gap-1.5">
          {!locked && (
            <button onClick={() => setDeadlineOpen((v) => !v)} className="opacity-60 hover:opacity-100" title="Set a deadline">
              <Clock size={12} />
            </button>
          )}
          {showForward && (
            <button
              onClick={() => moveForward(loc, task.id)}
              className="opacity-60 hover:opacity-100"
              title={locked ? "Postpone to today" : "Carry forward"}
            >
              <ArrowRight size={12} />
            </button>
          )}
          {!locked && (
            <button onClick={() => removeTask(loc, task.id)} className="opacity-60 hover:opacity-100" title="Delete task">
              <XIcon size={12} />
            </button>
          )}
        </div>
      </div>

      {deadlineOpen && !locked && (
        <div className="mt-1.5 flex flex-col gap-1">
          <input
            type="datetime-local"
            defaultValue={task.deadline ?? ""}
            onChange={(e) => setDeadline(loc, task.id, e.target.value)}
            className="w-full rounded-md border border-line bg-menu-bg px-1.5 py-1 font-mono text-[11px] text-menu-text"
          />
          <select
            defaultValue={task.reminderLead != null ? String(task.reminderLead) : "0"}
            onChange={(e) => setReminderLead(loc, task.id, parseInt(e.target.value, 10) || null)}
            className="w-full rounded-md border border-line bg-menu-bg px-1.5 py-1 text-[11px] text-menu-text"
          >
            <option value="0">Remind at deadline</option>
            <option value="15">Remind 15 min before</option>
            <option value="30">Remind 30 min before</option>
            <option value="60">Remind 1 hour before</option>
            <option value="1440">Remind 1 day before</option>
          </select>
        </div>
      )}
    </div>
  );
}
