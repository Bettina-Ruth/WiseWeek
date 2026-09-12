"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Task } from "@/types";

export default function DayTaskRow({
  task,
  pastDue,
  onToggle,
}: {
  task: Task;
  pastDue: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-line py-3.5 last:border-none">
      <motion.button
        onClick={onToggle}
        animate={task.done || pastDue ? { scale: [0.7, 1.18, 1] } : {}}
        transition={{ duration: 0.3 }}
        className={clsx(
          "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-[1.5px] text-[11px]",
          task.done
            ? "border-sage bg-sage text-white"
            : pastDue
              ? "border-clay bg-clay text-white"
              : "border-text-dim"
        )}
      >
        {task.done ? <Check size={12} /> : pastDue ? "✕" : ""}
      </motion.button>
      <div className="min-w-0 flex-1">
        <div className={clsx("text-sm", task.done && "text-text-dim line-through")}>{task.t}</div>
        <div className="mt-1 flex gap-1.5">
          <span
            className="rounded-md px-1.5 py-0.5 font-mono text-[9px]"
            style={{ background: `var(--pri-${task.tier === "must" ? "must" : task.tier === "should" ? "should" : "nice"}-bg)`, color: "var(--pri-text)" }}
          >
            {task.tier}
          </span>
          <span className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[9px] text-text-dim">
            {task.category}
          </span>
        </div>
      </div>
      {pastDue ? (
        <span className="rounded-md bg-clay px-1.5 py-0.5 font-mono text-[9.5px] font-semibold text-white">✕ Past due</span>
      ) : (
        <span
          className="rounded-md px-1.5 py-0.5 font-mono text-[10px]"
          style={{ background: `var(--pri-${task.e === "high" ? "must" : task.e === "med" ? "should" : "nice"}-bg)`, color: "var(--pri-text)" }}
        >
          {task.e}
        </span>
      )}
    </div>
  );
}
