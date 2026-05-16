"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import {
  type ConfirmDialogStore,
  createConfirmDialogStore,
} from "@/app/stores/confirm-dialog-store";

export type ConfirmDialogStoreApi = ReturnType<typeof createConfirmDialogStore>;


export const ConfirmDialogStoreContext = createContext<ConfirmDialogStoreApi | undefined>(
  undefined,
)

export interface ConfirmDialogStoreProviderProps {
  children: ReactNode;
}

export const ConfirmDialogStoreProvider = ({
  children,
}: ConfirmDialogStoreProviderProps) => {
  const [store] = useState(() => createConfirmDialogStore());
  return (
    <ConfirmDialogStoreContext.Provider value={store}>
      {children}
    </ConfirmDialogStoreContext.Provider>
  );
};

export const useConfirmDialogStore = <T,>(
  selector: (store: ConfirmDialogStore) => T
): T => {
  const confirmDialogStoreContext = useContext(ConfirmDialogStoreContext);
  if (!confirmDialogStoreContext) {
    throw new Error(
      `useConfirmDialogStore must be used within ConfirmDialogStoreProvider`
    );
  }

  return useStore(confirmDialogStoreContext, selector);
};