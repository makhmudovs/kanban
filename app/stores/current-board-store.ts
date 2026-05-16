import { createStore } from "zustand/vanilla";

type Board = {
  id: string;
  userId: string;
};

export type CurrentBoardState = {
  board: Board | null;
};

export type CurrentBoardActions = {
  setBoard: (board: Board) => void;
};

export type CurrentBoardStore = CurrentBoardState & CurrentBoardActions;

export const defaultInitState: CurrentBoardState = {
  board: null,
};

export const createCurrentBoardStore = (
  initState: CurrentBoardState = defaultInitState,
) => {
  return createStore<CurrentBoardStore>()((set) => ({
    ...initState,
    setBoard: (board: Board) => set({ board }),
  }));
};