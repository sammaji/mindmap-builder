"use client"

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type SettingsType = [boolean, Dispatch<SetStateAction<boolean>>];

export const SettingsContext = createContext<SettingsType>(null!);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const editingState = useState<boolean>(true);

  return (
    <SettingsContext.Provider value={editingState}>
      {children}
    </SettingsContext.Provider>
  );
}
