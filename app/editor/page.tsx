"use client";

import { v4 as uuid_v4 } from "uuid";
import { Input } from "@/components/ui/input";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Edge,
  Panel,
  Handle,
  Position,
  useKeyPress,
  OnEdgeUpdateFunc,
  updateEdge,
  SelectionMode,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/components/mindmap-editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useMousePosition from "@/components/hooks/use-mouse-position";
import { FiPlus } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { LuBold, LuItalic, LuUnderline } from "react-icons/lu";
import { ContextMenuItemIndicator } from "@radix-ui/react-context-menu";
import { cn } from "@/lib/utils";

function BasicNode({ id }: { id: string }) {
  const { onEditMode, deleteNode } = useSettings();
  const [isBold, setBold] = useState<boolean>(false);
  const [isItalic, setItalic] = useState<boolean>(false);
  const [isUnderline, setUnderline] = useState<boolean>(false);

  const styles: Record<string, string> = useMemo(
    () => ({
      red: "bg-red-200",
      green: "bg-green-200",
      purple: "bg-purple-200",
      orange: "bg-orange-200",
      default: "bg-background border-muted",
    }),
    [],
  );

  const [styleKey, setStyleKey] = useState<keyof typeof styles>("default");

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Handle type="target" position={Position.Top} />
        <Input
          className={cn("p-4 w-full h-full bg-background", styles[styleKey], {
            "font-bold": isBold,
            italic: isItalic,
            underline: isUnderline,
          })}
          placeholder="untitled"
          readOnly={!onEditMode}
        />
        <Handle type="target" position={Position.Top} />
        <Handle type="target" position={Position.Top} />

        <Handle type="source" position={Position.Bottom} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ToggleGroup type="single" className="p-2 flex">
          {Object.keys(styles).map((key, index) => (
            <ToggleGroupItem
              key={index}
              value={key}
              onClick={() => setStyleKey(key)}
              className={cn("p-0 h-6 w-6 rounded-full", styles[key])}
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

const nodeTypes = { basic: BasicNode };

export default function Page() {
  const {
    onEditMode,
    toggleEditMode,
    nodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    createNode,
    deleteAllNodes,
  } = useSettings();

  const isNPressed = useKeyPress("n");
  const position = useMousePosition();

  useEffect(() => {
    if (!isNPressed) return;
    createNode(position);
  }, [isNPressed]);

  const edgeUpdateSuccessful = useRef(true);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate: OnEdgeUpdateFunc<any> = useCallback(
    (oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [],
  );

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge<any>) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        proOptions={{ hideAttribution: true }}
        selectionOnDrag
        selectionMode={SelectionMode.Partial}
      >
        <Controls />
        <Panel position="top-right">
          <div className="space-x-2">
            <Button onClick={() => createNode()} variant="outline" size="icon">
              <FiPlus size={18} />
            </Button>
            <Dialog>
              <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 w-9">
                <MdOutlineDelete size={18} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="space-y-4">
                  <DialogTitle>
                    Are you sure you want to delete all nodes?
                  </DialogTitle>
                  <DialogDescription>
                    This will delete all your nodes.
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                      Cancel
                    </DialogClose>
                    <DialogClose
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                      onClick={() => deleteAllNodes()}
                    >
                      Delete all
                    </DialogClose>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* <Button variant={"outline"} onClick={toggleEditMode}>
            {onEditMode ? "edit" : "read"}
          </Button> */}
        </Panel>
        <Panel position="bottom-right">
          {nodes.length === 0 ? (
            <div className="space-y-4 pr-4 pb-6">
              <Alert>
                <AlertTitle>Pro Tip:</AlertTitle>
                <AlertDescription>
                  Press{" "}
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium opacity-100">
                    Shift
                  </kbd>{" "}
                  +
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium opacity-100">
                    P
                  </kbd>{" "}
                  to open command palatte.
                </AlertDescription>
              </Alert>
              <Alert>
                <AlertTitle>Quick Tip:</AlertTitle>
                <AlertDescription>
                  Press{" "}
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium opacity-100">
                    N
                  </kbd>{" "}
                  to add new nodes quickly.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <MiniMap />
          )}
        </Panel>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
