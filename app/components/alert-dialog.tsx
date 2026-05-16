"use client";

import { useAlertDialogStore } from "@/app/providers/alert-dialog-provider";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function AlertDialog() {
  const { isOpen, options, close } = useAlertDialogStore((s) => s);
  const duration = options?.duration ?? 3000;

  const variantStyles = {
    danger: "border-red-500/30 bg-red-500/10 text-red-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    info: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    success: "border-green-500/30 bg-green-500/10 text-green-400",
  };

  const barStyles = {
    danger: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    success: "bg-green-500",
  };

  const variant = options?.variant ?? "info";

  return (
    <AnimatePresence>
      {isOpen && options && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 w-80 rounded-xl border backdrop-blur-sm shadow-xl overflow-hidden ${variantStyles[variant]}`}
        >
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{options.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{options.description}</p>
              </div>
              <button onClick={close} className="text-gray-500 hover:text-white transition-colors shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            style={{ transformOrigin: "left" }}
            className={`h-0.5 w-full ${barStyles[variant]}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}