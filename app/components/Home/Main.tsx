"use client"
import React, { useState, useCallback, useRef } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, EdgeChange, Connection, Node, Edge, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import TextNode from '../Flow/TextNode';

const initialNodes: Node[] = [
    { id: '1', type: 'textNode', position: { x: 250, y: 50 }, data: { label: 'Node id-1' } },
];
const initialEdges: Edge[] = [];

const nodeTypes = {
    textNode: TextNode,
};

let id = 1;
const getId = () => `node-${++id}`;

function FlowBuilder() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    // For sidebar toggling
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params: Connection) => {
            setEdges((eds) => addEdge(params, eds));
        },
        [setEdges],
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            if (typeof type === 'undefined' || !type) {
                return;
            }

            if (!reactFlowInstance) return;

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode: Node = {
                id: getId(),
                type,
                position,
                data: { label: `Text message ${id}` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );

    const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
        if (nodes.length > 0) {
            setSelectedNodeId(nodes[0].id);
        } else {
            setSelectedNodeId(null);
        }
    }, []);

    const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) || null : null;

    const onSettingsDeselect = () => setSelectedNodeId(null);

    const onAddNode = useCallback((type: string) => {
        if (!reactFlowInstance) return;

        // Try to place the new node in the center of the current view
        const position = reactFlowInstance.screenToFlowPosition({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        });

        const newNode: Node = {
            id: getId(),
            type,
            position,
            data: { label: `Node id ${id}` },
        };

        setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes]);

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50 font-sans">
            <Header nodes={nodes} edges={edges} />
            <div className="flex flex-1 overflow-hidden relative">
                <div className="flex-1 h-full" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onSelectionChange={onSelectionChange}
                        fitView
                    />
                </div>
                <Sidebar
                    selectedNode={selectedNode}
                    setSelectedNode={(node) => setSelectedNodeId(node ? node.id : null)}
                    setNodes={setNodes}
                    onAddNode={onAddNode}
                />
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ReactFlowProvider>
            <FlowBuilder />
        </ReactFlowProvider>
    );
}