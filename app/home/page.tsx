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
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { SettingsProvider, useSettings } from "@/components/settings";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

function BasicNode({ id }: { id: string }) {
  const { onEditMode } = useSettings();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Handle type="target" position={Position.Top} />
        <Input
          className="p-4 w-full h-full"
          placeholder="untitled"
          readOnly={!onEditMode}
        />
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
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Options</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Export as JSON</ContextMenuItem>
            <ContextMenuItem>Export as Image</ContextMenuItem>
            <ContextMenuItem>Export as SVG</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Delete <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const initialNodes: Node<any, string | undefined>[] = [
  // {
  //   id: id1,
  //   position: { x: 200, y: 200 },
  //   type: "basic",
  //   style: initialNodeStyle,
  //   data: { id: id1 },
  // },
  // {
  //   id: id2,
  //   position: { x: 200, y: 400 },
  //   type: "basic",
  //   style: initialNodeStyle,
  //   data: { id: id2 },
  // },
  // {
  //   id: id3,
  //   position: { x: 600, y: 400 },
  //   type: "basic",
  //   style: initialNodeStyle,
  //   data: { id: id3 },
  // },
];

// const initialEdges: Edge<any>[] = [];

const nodeTypes = { basic: BasicNode };

export default function Page() {
  const { onEditMode, toggleEditMode } = useSettings();

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((edgs) => addEdge(params, edgs)),
    [setEdges],
  );

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
          <Button
            onClick={() =>
              setNodes((nds) => {
                const id = uuid_v4();
                return applyNodeChanges(
                  [
                    {
                      type: "add",
                      item: {
                        id,
                        type: "basic",
                        position: { x: 100, y: 100 },
                        data: { id },
                      },
                    },
                  ],
                  nds,
                );
              })
            }
          >
            add node
          </Button>

          <Button variant={"outline"} onClick={toggleEditMode}>
            {onEditMode ? "edit" : "read"}
          </Button>
        </Panel>
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
