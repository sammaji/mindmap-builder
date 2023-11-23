"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypographyP } from "./ui/typography";
import { useTheme } from "next-themes";
import { SettingsProvider, useSettings } from "./mindmap-editor";
import { useToast } from "./ui/use-toast";

export default function Navbar() {
  const { setTheme } = useTheme();
  const { onSave, onRestore } = useSettings();
  const { toast } = useToast();

  return (
    <SettingsProvider>
      <div className="px-8 h-[48px] w-screen flex items-center justify-between">
        <div className="space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger>File</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  onSave();
                  toast({ className: "bg-green-100 border-green-400 text-green-800", description: "Saved" });
                }}
              >
                Save
              </DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem onClick={onRestore}>
                Restore Last Save
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Import</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Import from JSON</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Export as JSON</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>View</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Themes</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>Help</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>User Manual</DropdownMenuItem>
              <DropdownMenuItem>Shortcuts Reference</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <TypographyP className="border-none w-[200px]">Hello world</TypographyP>
        <div></div>
      </div>
    </SettingsProvider>
  );
}
