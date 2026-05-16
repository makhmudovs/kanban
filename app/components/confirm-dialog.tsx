"use client";

import { Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import { AlertTriangle, Info, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"
import { useConfirmDialogStore } from "@/app/providers/confirm-dialog-provider";

const variantConfig = {
  danger: {
    icon: Trash2,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    confirmBtn: "bg-red-500 hover:bg-red-600 text-white",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    confirmBtn: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  info: {
    icon: Info,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    confirmBtn: "bg-violet-500 hover:bg-violet-600 text-white",
  },
};

export default function ConfirmDialog() {
  const isOpen = useConfirmDialogStore((s) => s.isOpen);
  const options = useConfirmDialogStore((s) => s.options);
  const close = useConfirmDialogStore((s) => s.close);

  const handleConfirm = () => {
    options?.onConfirm();
    close();
  };

  const handleCancel = () => {
    options?.onCancel?.();
    close();
  };

  const variant = variantConfig[options?.variant ?? "info"];
  const Icon = variant.icon;

  return (
    <AnimatePresence>
      {isOpen && options && (
        <Dialog
          static
          open={isOpen}
          onClose={handleCancel}
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
              <DialogPanel className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1d2e] shadow-2xl shadow-black/50 p-6">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2.5 rounded-xl ${variant.iconBg} shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${variant.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-base font-semibold text-white">
                      {options.title}
                    </DialogTitle>
                    <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                      {options.description}
                    </p>
                  </div>
                  <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-300 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 mt-6">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    {options.cancelLabel ?? "Cancel"}
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${variant.confirmBtn}`}
                  >
                    {options.confirmLabel ?? "Confirm"}
                  </button>
                </div>
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
