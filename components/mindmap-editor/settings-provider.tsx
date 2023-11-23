"use client";

import { v4 as uuid_v4 } from "uuid";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnEdgeUpdateFunc,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

type UnitFunction = () => void;

type SettingsType = {
  onEditMode: boolean;
  toggleEditMode: UnitFunction;
  nodes: Node<any, string | undefined>[];
  edges: Edge<any>[];
  setNodes: Dispatch<SetStateAction<Node<any, string | undefined>[]>>;
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onEdgeUpdateStart: UnitFunction;
  onEdgeUpdate: OnEdgeUpdateFunc<any>;
  onEdgeUpdateEnd: (_: any, edge: Edge<any>) => void;
  onConnect: (params: any) => void;
  createNode: (position?: { x: number; y: number }) => void;
  deleteNode: (id: string) => void;
  deleteAllNodes: UnitFunction;
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

  const deleteAllNodes = () => setNodes([]);

  const [edges, setEdges] = useEdgesState([]);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

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
        onEdgeUpdate,
        onEdgeUpdateStart,
        onEdgeUpdateEnd,
        onConnect,
        createNode,
        deleteNode,
        deleteAllNodes,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
