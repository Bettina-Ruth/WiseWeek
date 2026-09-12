"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { generateAntiProcSteps, AP_COLORS } from "@/lib/anti-procrastination";

interface AntiProcContextValue {
  open: (taskTitle: string) => void;
}

const AntiProcContext = createContext<AntiProcContextValue | null>(null);

export function AntiProcProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [done, setDone] = useState<boolean[]>([]);

  const open = useCallback((taskTitle: string) => {
    const t = taskTitle || "Your next task";
    setTitle(t);
    const s = generateAntiProcSteps(t);
    setSteps(s);
    setDone(new Array(s.length).fill(false));
    setIsOpen(true);
  }, []);

  const toggleStep = (i: number) => {
    setDone((prev) => prev.map((d, idx) => (idx === i ? !d : d)));
  };

  const finished = steps.length > 0 && done.every(Boolean);

  return (
    <AntiProcContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              className="relative w-full max-w-[420px] max-h-[85vh] overflow-y-auto rounded-[20px] border border-line bg-surface p-8 text-center shadow-2xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-lg bg-surface2 text-text-dim hover:text-text"
                onClick={() => setIsOpen(false)}
              >
                <X size={14} />
              </button>
              <h2 className="mb-1 text-lg font-medium text-text">{title}</h2>
              <p className="mb-5 text-[12.5px] leading-relaxed text-text-dim">
                Check off each tiny step — a piece gets added below.
                <br />
                Finish the set and watch it come together.
              </p>

              <div className="mb-5 flex min-h-[190px] flex-col-reverse items-center justify-start gap-1.5">
                <AnimatePresence>
                  {steps.map(
                    (s, i) =>
                      done[i] && (
                        <motion.div
                          key={s}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex h-9 w-[170px] items-center justify-center rounded-lg px-2.5 text-[11.5px] font-semibold text-white"
                          style={{ background: AP_COLORS[i % AP_COLORS.length] }}
                        >
                          {s}
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </div>

              <div className="mx-auto max-w-[320px] text-left">
                {steps.map((s, i) => (
                  <div
                    key={s}
                    className="flex cursor-pointer select-none items-center gap-2.5 border-b border-line py-2.5 text-[13.5px] last:border-none"
                    onClick={() => toggleStep(i)}
                  >
                    <div
                      className={`flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-md border-[1.5px] text-[11px] ${
                        done[i] ? "border-sage bg-sage text-[#191308]" : "border-text-dim"
                      }`}
                    >
                      {done[i] && "✓"}
                    </div>
                    <span className={done[i] ? "text-text-dim line-through" : "text-text"}>{s}</span>
                  </div>
                ))}
              </div>

              {finished && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-[14.5px] font-medium text-text"
                >
                  🎉 Built! That wasn&apos;t so bad — go do the real thing next.
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AntiProcContext.Provider>
  );
}

export function useAntiProc() {
  const ctx = useContext(AntiProcContext);
  if (!ctx) throw new Error("useAntiProc must be used within an AntiProcProvider");
  return ctx;
}
