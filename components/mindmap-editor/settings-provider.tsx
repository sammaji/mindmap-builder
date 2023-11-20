"use client";

import { v4 as uuid_v4 } from "uuid";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";

type SettingsType = {
  onEditMode: boolean;
  toggleEditMode: () => void;
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>;
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: any) => void;
  createNode: (position?: { x: number; y: number }) => void;
  deleteNode: (id: string) => void;
};

export const SettingsContext = createContext<SettingsType>(null!);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [onEditMode, setEditMode] = useState<boolean>(true);
  const toggleEditMode = () => setEditMode((s) => !s);

  const [nodes, setNodes] = useNodesState([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const createNode = (position = { x: 100, y: 100 }) =>
    setNodes((nds) => {
      const id = uuid_v4();
      return applyNodeChanges(
        [
          {
            type: "add",
            item: {
              id,
              type: "basic",
              position,
              data: { id },
            },
          },
        ],
        nds,
      );
    });

  const deleteNode = (id: string | string[]) => {
    setNodes((ngs) => {
      let changes: NodeChange[] =
        typeof id === "string"
          ? [
              {
                type: "remove",
                id,
              },
            ]
          : id.map((value) => ({
              type: "remove",
              id: value,
            }));

      return applyNodeChanges(changes, ngs);
    });
  };

  const [edges, setEdges] = useEdgesState([]);

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
    <SettingsContext.Provider
      value={{
        onEditMode,
        toggleEditMode,
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        createNode,
        deleteNode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
