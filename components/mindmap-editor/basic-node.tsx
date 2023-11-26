import React, { useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useSettings } from "./use-settings";
import { Handle, Position } from "reactflow";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LuBold, LuItalic, LuUnderline } from "react-icons/lu";

export function BasicNode({ id }: { id: string }) {
  const { onEditMode, deleteNode } = useSettings();
  const [isBold, setBold] = useState<boolean>(false);
  const [isItalic, setItalic] = useState<boolean>(false);
  const [isUnderline, setUnderline] = useState<boolean>(false);

  const styles: Record<string, string> = useMemo(
    () => ({
      red: "bg-red-200 border-red-400 hover:bg-red-200",
      green: "bg-green-200 border-green-400 hover:bg-green-200",
      purple: "bg-purple-200 border-purple-400 hover:bg-purple-200",
      // orange: "bg-orange-200 border-orange-400 hover:bg-orange-200",
      default: "bg-background border-[rgba(0,0,0,0.24)]",
    }),
    [],
  );

  const [styleKey, setStyleKey] = useState<keyof typeof styles>("default");
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Handle type="source" className="w-[40px]" id="handle1" position={Position.Top} /> 
        <Handle type="source" id="handle2" position={Position.Left}/>
        <Handle type="source" id="handle3" position={Position.Right}/>
        <Handle type="source" id="handle4" position={Position.Bottom}/>
        <Input
          className={cn("p-4 w-full h-full bg-background", styles[styleKey], {
            "font-bold": isBold,
            italic: isItalic,
            underline: isUnderline,
          })}
          placeholder="untitled"
          readOnly={!onEditMode}
        />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ToggleGroup type="single" className="p-2 flex">
          {Object.keys(styles).map((key, index) => (
            <ToggleGroupItem
              key={index}
              value={key}
              onClick={() => setStyleKey(key)}
              className={cn(
                "p-0 h-6 w-6 rounded-full border-[1px] hover:border-2",
                styles[key],
              )}
            ></ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ContextMenuSeparator />
        <ToggleGroup type="multiple">
          <ToggleGroupItem
            value="bold"
            onClick={() => {
              setBold((x) => !x);
            }}
            aria-label="Toggle bold"
          >
            <LuBold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            onClick={() => setItalic((x) => !x)}
            aria-label="Toggle italic"
          >
            <LuItalic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            onClick={() => setUnderline((x) => !x)}
            aria-label="Toggle underline"
          >
            <LuUnderline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => deleteNode(id)}>
          Delete <ContextMenuShortcut>del</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
