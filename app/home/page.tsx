"use client";

import { v4 as uuid_v4 } from "uuid";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Panel,
  Handle,
  Position,
  useKeyPress,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { SettingsProvider, useSettings } from "@/components/mindmap-editor";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useMousePosition from "@/components/hooks/use-mouse-position";

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
    onNodesChange,
    onEdgesChange,
    onConnect,
    createNode,
  } = useSettings();

  const isNPressed = useKeyPress("n");
  const position = useMousePosition();

  useEffect(() => {
    if (!isNPressed) return;
    createNode(position);
  }, [isNPressed]);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <Button onClick={() => createNode()}>add node</Button>

          <Button variant={"outline"} onClick={toggleEditMode}>
            {onEditMode ? "edit" : "read"}
          </Button>
        </Panel>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
