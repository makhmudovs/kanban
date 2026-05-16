import { createStore } from "zustand";

interface ConfirmDialogOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface ConfirmDialogStore {
  isOpen: boolean;
  options: ConfirmDialogOptions | null;
  confirm: (options: ConfirmDialogOptions) => void;
  close: () => void;
}

export const createConfirmDialogStore = () =>
  createStore<ConfirmDialogStore>((set) => ({
    isOpen: false,
    options: null,
    confirm: (options) => set({ isOpen: true, options }),
    close: () => set({ isOpen: false, options: null }),
  }));