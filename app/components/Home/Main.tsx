"use client"
import React, { useState, useCallback, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, EdgeChange, Connection, Node, Edge, ReactFlowProvider, useReactFlow, Background, BackgroundVariant, ReactFlowInstance } from '@xyflow/react';
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
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const { fitView } = useReactFlow();

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

    // Triggered when a connection line is drawn between a source and a target handle
    const onConnect = useCallback(
        (params: Connection) => {
            // Restriction Check: Ensure the source handle (right dot) is only used once.
            // A target handle (left dot) can accept multiple incoming connections natively.
            const sourceAlreadyConnected = edges.some(edge => edge.source === params.source);
            if (sourceAlreadyConnected) {
                toast.error('Source handle can only have one connected edge');
                return;
            }
            // Register the connection in state if valid
            setEdges((eds) => addEdge(params, eds));
        },
        [edges, setEdges],
    );

    // Required to allow the browser to accept dropped items onto the canvas element
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // Handles the event when a node from the 'Nodes Panel' sidebar is dropped onto the canvas
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

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        fitView({
            nodes: [{ id: node.id }],
            duration: 800,
            padding: 0.2
        });
    }, [fitView]);

    const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
        if (nodes.length > 0) {
            setSelectedNodeId(nodes[0].id);
        } else {
            setSelectedNodeId(null);
        }
    }, []);

    // Helper: Find the complete node object for the currently selected ID
    const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) || null : null;

    // Handles clicking the "Message" button in the Nodes panel to quickly add a node without dragging
    const onAddNode = useCallback((type: string) => {
        if (!reactFlowInstance) return;

        // Try to place the new node in the center of the current view, but with a slight random offset
        // so they don't stack directly on top of each other
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Random offset between -10% and +10% of window size
        const offsetX = (Math.random() - 0.5) * 0.2 * window.innerWidth;
        const offsetY = (Math.random() - 0.5) * 0.2 * window.innerHeight;

        const position = reactFlowInstance.screenToFlowPosition({
            x: centerX + offsetX,
            y: centerY + offsetY,
        });

        const newNode: Node = {
            id: getId(),
            type,
            position,
            data: { label: `Node id ${id}` },
        };

        setNodes((nds) => nds.concat(newNode));
        toast.success(`Added new ${type} node`);
    }, [reactFlowInstance, setNodes]);

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50 font-sans">
            <Toaster position="top-center" />
            <Header nodes={nodes} edges={edges} />
            <div className="flex flex-1 overflow-hidden relative">
                <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
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
                        onNodeClick={onNodeClick}
                    >
                        <Background color="#ccc" variant={BackgroundVariant.Dots} gap={16} size={1.5} />
                    </ReactFlow>
                </div>
                <Sidebar
                    selectedNode={selectedNode}
                    setSelectedNode={(node) => setSelectedNodeId(node ? node.id : null)}
                    setNodes={setNodes}
                    onAddNode={onAddNode}
                />
            </div>
            {/* Footer */}
            <div className="bg-white border-t border-gray-200 flex items-center justify-center p-2 text-sm text-gray-500 z-50 shrink-0 relative">
                <a
                    href="https://nitinwalia.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-700 hover:text-blue-600 transition-colors px-4 py-1 rounded-full hover:bg-gray-100 uppercase tracking-wider text-xs"
                >
                    DEVELOPED BY NITIN WALIA
                </a>
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