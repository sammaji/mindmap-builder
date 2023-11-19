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
import {
  SettingsProvider,
  useSettings,
} from "@/components/settings";

function BasicNode({ id }: { id: string }) {

  const [isEditing] = useSettings()

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Input className="p-4 w-full h-full" placeholder="untitled" readOnly={!isEditing} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

const initialNodeStyle = {
  padding: 0,
};

const id1 = uuid_v4();
const id2 = uuid_v4();
const id3 = uuid_v4();

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

const initialEdges: Edge<any>[] = [];

export default function Page() {
  const [isEditing, setEditingState] = useSettings();

  const nodeTypes = useMemo(
    () => ({
      basic: BasicNode,
    }),
    [],
  );

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

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

            <Button
              variant={"outline"}
              onClick={() => setEditingState((s) => !s)}
            >{isEditing ? "edit" : "read"}</Button>
          </Panel>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
  );
}
