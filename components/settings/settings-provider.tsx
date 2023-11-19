"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type SettingsType = {
  onEditMode: boolean;
  toggleEditMode: () => void;
};

export const SettingsContext = createContext<SettingsType>(null!);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [onEditMode, setEditMode] = useState<boolean>(true);
  const toggleEditMode = () => setEditMode((s) => !s);

  return (
    <SettingsContext.Provider
      value={{
        onEditMode,
        toggleEditMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
