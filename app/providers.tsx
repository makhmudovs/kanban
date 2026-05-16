"use client";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { SidebarStoreProvider } from "@/app/providers/sidebar-provider";
import { ConfirmDialogStoreProvider } from "@/app/providers/confirm-dialog-provider";
import ConfirmDialog from "@/app/components/confirm-dialog";
import { CurrentBoardStoreProvider } from "@/app/providers/current-board-provider";
import { AlertDialogStoreProvider } from "./providers/alert-dialog-provider";
import { AlertDialog } from "./components/alert-dialog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarStoreProvider>
        <ConfirmDialogStoreProvider>
          <AlertDialogStoreProvider>
            <CurrentBoardStoreProvider>{children}</CurrentBoardStoreProvider>
            <AlertDialog />
          </AlertDialogStoreProvider>
          <ConfirmDialog />
        </ConfirmDialogStoreProvider>
      </SidebarStoreProvider>
    </ThemeProvider>
  );
}
