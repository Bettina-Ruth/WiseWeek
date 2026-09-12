"use client";

import { useState } from "react";
import clsx from "clsx";
import Topbar from "@/components/layout/Topbar";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { Energy } from "@/types";

function EnergyRow({ label, initial }: { label: string; initial: Energy }) {
  const [val, setVal] = useState<Energy>(initial);
  const options: { value: Energy; label: string }[] = [
    { value: "high", label: "High" },
    { value: "med", label: "Medium" },
    { value: "low", label: "Low" },
  ];
  return (
    <div className="mb-3.5">
      <p className="mb-2 text-xs text-text-dim">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => {
          const selected = val === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setVal(opt.value)}
              className={clsx("flex-1 rounded-[9px] py-2.5 text-xs border-[1.5px]", !selected && "border-transparent bg-surface2 text-text-dim")}
              style={
                selected
                  ? {
                      background: `var(--pri-${opt.value === "high" ? "must" : opt.value === "med" ? "should" : "nice"}-bg)`,
                      color: "var(--pri-text)",
                      borderColor: "transparent",
                    }
                  : undefined
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToggleRow({ label, desc, initial }: { label: string; desc: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center justify-between border-b border-line py-4 last:border-none">
      <div>
        <div className="text-sm font-medium text-text">{label}</div>
        <div className="mt-0.5 text-xs text-text-dim">{desc}</div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={clsx(
          "relative h-6 w-[42px] flex-shrink-0 rounded-full border transition-colors",
          on ? "border-sage bg-sage-soft" : "border-line bg-surface2"
        )}
      >
        <span
          className={clsx(
            "absolute top-[2px] h-[18px] w-[18px] rounded-full transition-all",
            on ? "left-5 bg-sage" : "left-[2px] bg-text-dim"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { toggleTheme } = useWiseWeek();
  return (
    <>
      <Topbar title="Settings" sub="Energy windows & preferences" />
      <div className="flex-1 overflow-y-auto p-7">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="card">
            <h3 className="mb-4 font-display text-base text-text">Energy windows</h3>
            <EnergyRow label="Morning" initial="high" />
            <EnergyRow label="Afternoon" initial="med" />
            <EnergyRow label="Evening" initial="low" />
          </div>
          <div className="card">
            <h3 className="mb-4 font-display text-base text-text">Preferences</h3>
            <div onClick={toggleTheme}>
              <ToggleRow label="Dark mode" desc="Match system or choose manually" initial={false} />
            </div>
            <ToggleRow label="Notifications" desc="Deadline and reflection reminders" initial={true} />
            <ToggleRow label="Weekend protection" desc="Warn when weekends get overloaded" initial={true} />
            <ToggleRow label="Calendar sync" desc="Two-way sync with Google Calendar" initial={false} />
          </div>
        </div>
      </div>
    </>
  );
}
