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
        <div className="px-8 h-[48px] w-screen flex items-center justify-between">
          <div className="space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger>File</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    onSave();
                    toast({
                      className: "bg-green-100 border-green-400 text-green-800",
                      description: "Saved",
                    });
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
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>Help</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/help/user-manual">User Manual</Link>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Shortcuts Reference</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <TypographyP className="border-none w-[200px] font-bold">
            Mindmap Builder
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
