"use client";

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

interface ModalContextValue {
  promptInput: (title: string, defaultValue?: string) => Promise<string | null>;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const resolverRef = useRef<((v: string | null) => void) | null>(null);

  const promptInput = useCallback((t: string, defaultValue = "") => {
    setTitle(t);
    setValue(defaultValue);
    setOpen(true);
    return new Promise<string | null>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const close = (result: string | null) => {
    setOpen(false);
    resolverRef.current?.(result);
    resolverRef.current = null;
  };

  return (
    <ModalContext.Provider value={{ promptInput }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[600] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close(null);
          }}
        >
          <div className="w-full max-w-[320px] rounded-2xl bg-surface border border-line p-6 shadow-2xl">
            <div className="text-sm font-semibold mb-3 text-text">{title}</div>
            <input
              autoFocus
              className="w-full mb-4 rounded-lg border border-line bg-surface2 px-3 py-2.5 text-[13.5px] text-text focus:outline-none focus:border-sage"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") close(value);
                if (e.key === "Escape") close(null);
              }}
            />
            <div className="flex justify-end gap-2">
              <button
                className="rounded-full border border-line px-4 py-2 text-sm text-text hover:border-sage"
                onClick={() => close(null)}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-sage px-4 py-2 text-sm font-medium text-[#152014] hover:bg-sage-hover"
                onClick={() => close(value)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}
