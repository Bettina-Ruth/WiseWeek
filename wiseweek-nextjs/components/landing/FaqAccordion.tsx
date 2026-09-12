"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const FAQS = [
  {
    q: "Is WiseWeek a task manager?",
    a: "No. Task lists are a side effect. The goal is to improve the decisions behind your week — what to commit to, when, and at what energy level.",
  },
  {
    q: "What happens if I miss a day?",
    a: "Nothing breaks. The weekly life score and streaks are designed to reward consistency, not punish a single missed day.",
  },
  {
    q: "Do I need to log everything manually?",
    a: "No — natural language quick add, calendar sync, and automatic time learning reduce manual entry significantly.",
  },
  {
    q: "Can I use this with a team?",
    a: "The Teams plan adds shared weekly reviews so a small team can see workload and balance together, without micromanaging.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-2xl">
      {FAQS.map((f, i) => (
        <div key={f.q} className="border-b border-line py-5">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between text-left text-[15.5px] font-medium text-text"
          >
            {f.q}
            <ChevronDown size={18} className={clsx("text-text-dim transition-transform", open === i && "rotate-180")} />
          </button>
          <div
            className={clsx(
              "overflow-hidden text-sm leading-relaxed text-text-dim transition-all",
              open === i ? "mt-3.5 max-h-40" : "max-h-0"
            )}
          >
            {f.a}
          </div>
        </div>
      ))}
    </div>
  );
}
