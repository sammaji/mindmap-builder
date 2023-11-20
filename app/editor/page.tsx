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
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/components/mindmap-editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

function BasicNode({ id }: { id: string }) {
  const { onEditMode, deleteNode } = useSettings();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Handle type="target" position={Position.Top} />
        <Input
          className="p-4 w-full h-full"
          placeholder="untitled"
          readOnly={!onEditMode}
        />
        <Handle type="target" position={Position.Top} />
        <Handle type="target" position={Position.Top} />

        <Handle type="source" position={Position.Bottom} />
      </ContextMenuTrigger>
      <ContextMenuContent>
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
      >
        <Controls />
        {/* <MiniMap /> */}
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
          ) : (
            <></>
          )}
        </Panel>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
