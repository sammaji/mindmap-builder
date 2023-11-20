import { useContext } from "react";
import { SettingsContext } from "./settings-provider";

export const useSettings = () => useContext(SettingsContext);