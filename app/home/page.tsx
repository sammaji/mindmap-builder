"use client"

import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node, Edge, BezierPathOptions
} from 'reactflow';
import 'reactflow/dist/style.css';

function NodeElement() {
    return (
        <input className="p-4 w-full h-full border-none outline-none" placeholder='enter a number' />
    )
}

const initialNodeStyle = {
    padding: 0
}

const initialNodes: Node<any, string | undefined>[] = [
    {id: '1', position: {x: 200, y: 200}, style: initialNodeStyle, data: {label: NodeElement()}},
    {id: '2', position: {x: 200, y: 400}, style: initialNodeStyle, data: {label: NodeElement()}}
]

const initialEdges: Edge<any>[] = [
    {id: 'e12', source: '1', target: '2' }
]




export default function Page() {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const onConnect = useCallback(
        (params: any) => setEdges((edgs) => addEdge(params, edgs)),
        [setEdges]
    )

    return (
        <div className="w-screen h-screen">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
              <Controls />
              <MiniMap />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />  
            </ReactFlow>
        </div>
    )
}