'use client'

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'
import { type CurrentBoardStore, createCurrentBoardStore } from '@/app/stores/current-board-store'

export type CurrentBoardStoreApi = ReturnType<typeof createCurrentBoardStore>

export const CurrentBoardStoreContext = createContext<CurrentBoardStoreApi | undefined>(undefined)

export interface CurrentBoardStoreProviderProps {
  children: ReactNode
}

export const CurrentBoardStoreProvider = ({
  children,
}: CurrentBoardStoreProviderProps) => {
  const [store] = useState(() => createCurrentBoardStore())
  return (
    <CurrentBoardStoreContext.Provider value={store}>
      {children}
    </CurrentBoardStoreContext.Provider>
  )
}

export const useCurrentBoardStore = <T,>(
  selector: (store: CurrentBoardStore) => T,
): T => {
  const context = useContext(CurrentBoardStoreContext)
  if (!context) {
    throw new Error('useCurrentBoardStore must be used within CurrentBoardStoreProvider')
  }
  return useStore(context, selector)
}