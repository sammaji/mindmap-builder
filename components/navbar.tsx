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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Kbd from "@/components/ui/kbd";
import { TypographyP } from "./ui/typography";
import { useTheme } from "next-themes";
import { SettingsProvider, shortcuts, useSettings } from "./mindmap-editor";
import { useToast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function Navbar() {
  const { setTheme } = useTheme();
  const { onSave, onRestore } = useSettings();
  const { toast } = useToast();

  return (
    <SettingsProvider>
      <Dialog>
        <div className="px-4 h-[48px] w-screen flex items-center justify-between">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() => {
                    onSave();
                    toast({
                      className: "bg-green-100 border-green-400 text-green-800",
                      description: "Saved",
                    });
                  }}
                >
                  Save
                </MenubarItem>
                <MenubarItem onClick={onRestore}>Restore Last Save</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Import</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Import from JSON</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSub>
                  <MenubarSubTrigger>Export</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Export as JSON</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Themes</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={() => setTheme("dark")}>
                      Dark
                    </MenubarItem>
                    <MenubarItem onClick={() => setTheme("light")}>
                      Light
                    </MenubarItem>
                    <MenubarItem onClick={() => setTheme("system")}>
                      System
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href="/help/user-manual">User Manual</Link>
                </MenubarItem>
                <DialogTrigger asChild>
                  <MenubarItem>Shortcuts Reference</MenubarItem>
                </DialogTrigger>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <TypographyP className="border-none w-[200px] font-bold">
            Mindmaply
          </TypographyP>
          <div></div>
        </div>
        <DialogContent className="overflow-auto">
          <DialogHeader className="space-y-4">
            <DialogTitle>List of shortcuts</DialogTitle>
            <DialogDescription>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    <TableHead>Command</TableHead>
                    <TableHead className="w-[120px]">Shortcut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shortcuts.map((value, key) => (
                    <TableRow key={key}>
                      <TableCell className="font-medium">
                        {value.command}
                      </TableCell>
                      <TableCell>
                        <Kbd>{value.shortcut}</Kbd>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </SettingsProvider>
  );
}
