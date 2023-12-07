import React from "react";
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

type Shortcut = {
  command: string;
  shortcut: string;
};

const shortcuts: Shortcut[] = [
  {
    command: "Open command palatte",
    shortcut: "Ctrl+P",
  },
  {
    command: "Create new node",
    shortcut: "N",
  },
];

export default function Page() {
  return (
    <div className="mx-auto w-1/2">
      <Table>
        <TableCaption>A list of shortcuts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Command</TableHead>
            <TableHead className="w-[120px]">Shortcut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shortcuts.map((value, key) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{value.command}</TableCell>
              <TableCell>
                <Kbd>{value.shortcut}</Kbd>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
