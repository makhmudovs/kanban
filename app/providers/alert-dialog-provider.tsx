"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";
import {
  type AlertDialogStore,
  createAlertDialogStore,
} from "@/app/stores/alert-dialog-store";

export type AlertDialogStoreApi = ReturnType<typeof createAlertDialogStore>;

export const AlertDialogStoreContext = createContext<AlertDialogStoreApi | undefined>(undefined);

export interface AlertDialogStoreProviderProps {
  children: ReactNode;
}

export const AlertDialogStoreProvider = ({
  children,
}: AlertDialogStoreProviderProps) => {
  const [store] = useState(() => createAlertDialogStore());
  return (
    <AlertDialogStoreContext.Provider value={store}>
      {children}
    </AlertDialogStoreContext.Provider>
  );
};

export const useAlertDialogStore = <T,>(
  selector: (store: AlertDialogStore) => T
): T => {
  const context = useContext(AlertDialogStoreContext);
  if (!context) {
    throw new Error("useAlertDialogStore must be used within AlertDialogStoreProvider");
  }
  return useStore(context, selector);
};