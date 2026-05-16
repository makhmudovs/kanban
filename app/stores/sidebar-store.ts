import { createStore } from "zustand/vanilla";

export type SidebarState = {
  desktopSidebarOpen: boolean;
  mobileSidebarOpen: boolean;
};

export type SidebarActions = {
  desktopSidebarToggle: (open: boolean) => void;
  mobileSidebarToggle: (open: boolean) => void;
};

export type SidebarStore = SidebarState & SidebarActions;

export const defaultInitState: SidebarState = {
  desktopSidebarOpen: true,
  mobileSidebarOpen: false,
};

export const createSidebarStore = (
  initState: SidebarState = defaultInitState,
) => {
  return createStore<SidebarStore>()((set) => ({
    ...initState,
    desktopSidebarToggle: (open: boolean) =>
      set((state) => ({ desktopSidebarOpen: open })),
    mobileSidebarToggle: (open: boolean) =>
      set((state) => ({ mobileSidebarOpen: open })),
  }));
};
