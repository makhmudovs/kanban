import { createStore } from "zustand";

interface AlertDialogOptions {
  title: string;
  description: string;
  variant?: "danger" | "warning" | "info" | "success";
  duration?: number; // ms, default 3000
}

export interface AlertDialogStore {
  isOpen: boolean;
  options: AlertDialogOptions | null;
  alert: (options: AlertDialogOptions) => void;
  close: () => void;
}

export const createAlertDialogStore = () =>
  createStore<AlertDialogStore>((set, get) => ({
    isOpen: false,
    options: null,
    alert: (options) => {
      set({ isOpen: true, options });

      setTimeout(() => {
        // only close if this same alert is still open
        if (get().isOpen) {
          set({ isOpen: false, options: null });
        }
      }, options.duration ?? 3000);
    },
    close: () => set({ isOpen: false, options: null }),
  }));