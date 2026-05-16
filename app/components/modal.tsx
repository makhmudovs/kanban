"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DrawerProps {
  showFooter: boolean;
  children: React.ReactNode;
  title?: string;
  returnUrl?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({
  showFooter = true,
  children,
  title,
  returnUrl = "/dashboard",
  open = true,
  onOpenChange,
}: DrawerProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
    // router.push(returnUrl);
    onOpenChange?.(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          static
          open={open}
          onClose={handleClose}
          className="relative z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <DialogPanel className="w-full max-w-lg rounded-2xl border border-white/10 bg-gray-50 dark:bg-[#20212C] shadow-2xl shadow-black/50 p-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-base font-semibold text-black dark:text-white">
                      {title}
                    </DialogTitle>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-300 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto mt-4">{children}</div>
                {/* Actions */}
                {showFooter && (
                  <div className="flex items-center justify-end gap-2.5 mt-6">
                    <button
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-medium text-gray-40 rounded-xl transition-colors bg-amber-500"
                    >
                      Cancel
                    </button>
                    <button
                      // onClick={handleConfirm}
                      className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors bg-blue-500`}
                    >
                      {/* {options.confirmLabel ?? "Confirm"} */} Confirm
                    </button>
                  </div>
                )}
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
