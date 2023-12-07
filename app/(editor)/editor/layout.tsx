import { SettingsProvider } from "@/components/mindmap-editor";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
