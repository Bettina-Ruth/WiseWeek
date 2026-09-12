"use client";

import { useState } from "react";
import { useWiseWeek } from "@/context/WiseWeekContext";
import { DAY_NAMES } from "@/lib/date-utils";

export default function FutureMessageComposer() {
  const { futureMessages, addFutureMessage, removeFutureMessage, todayIdx } = useWiseWeek();
  const [day, setDay] = useState(todayIdx);
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    addFutureMessage(day, text);
    setText("");
  }

  return (
    <div className="card mt-[18px]">
      <h3 className="mb-4 font-display text-base text-text">Future Me messages</h3>
      <div className="mb-3">
        {futureMessages.length === 0 ? (
          <div className="text-[13px] text-text-dim">No messages waiting yet.</div>
        ) : (
          futureMessages.map((m, idx) => (
            <div key={idx} className="flex items-center gap-2.5 border-b border-line py-2.5 last:border-none">
              <span className="w-20 flex-shrink-0 font-mono text-[10px] uppercase text-sage-text">{DAY_NAMES[m.day]}</span>
              <div className="flex-1 text-[13px] italic text-text">&quot;{m.text}&quot;</div>
              <button onClick={() => removeFutureMessage(idx)} className="text-text-dim hover:text-clay">
                ✕
              </button>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <select
          value={day}
          onChange={(e) => setDay(parseInt(e.target.value, 10))}
          className="rounded-lg border border-line bg-menu-bg px-2 py-2 text-xs text-menu-text"
        >
          {DAY_NAMES.map((name, i) => (
            <option key={name} value={i}>
              {name}
            </option>
          ))}
        </select>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Dear ___ Me…"
          className="flex-1 rounded-lg border border-line bg-surface2 px-3 py-2 text-[12.5px] text-text focus:border-sage focus:outline-none"
        />
        <button onClick={handleSend} className="rounded-full bg-sage px-4 py-2 text-[12.5px] font-medium text-[#152014] hover:bg-sage-hover">
          Send
        </button>
      </div>
    </div>
  );
}
