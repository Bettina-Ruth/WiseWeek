"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useWiseWeek } from "@/context/WiseWeekContext";

export default function ToastContainer() {
  const { toasts } = useWiseWeek();

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="max-w-[300px] rounded-xl border border-sage bg-surface px-[18px] py-3 text-[13px] text-text shadow-lg"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
