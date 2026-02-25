import React from 'react';
import toast from 'react-hot-toast';
import { Node, Edge } from '@xyflow/react';

interface HeaderProps {
    nodes: Node[];
    edges: Edge[];
}

export default function Header({ nodes, edges }: HeaderProps) {

    // Master save function validates the state of the board before saving
    const onSave = () => {
        // Validation Constraint: 
        // Flow cannot be saved if there are MORE than one nodes on the canvas
        // that have NO incoming connections (empty targets).
        let emptyTargets = 0;

        for (const node of nodes) {
            // Check if this node is the target of any edge
            const hasIncomingEdge = edges.some(edge => edge.target === node.id);
            if (!hasIncomingEdge) {
                emptyTargets++;
            }
        }

        if (nodes.length > 1 && emptyTargets > 1) {
            toast.error('Cannot save Flow. More than one node has empty target handles.');
        } else {
            toast.success('Flow saved successfully!');
        }
    };

    return (
        <header className="h-16 w-full flex items-center justify-between px-6 bg-gray-50 border-b border-gray-200 shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
                Assignment by Nitin walia
            </h1>
            <button
                onClick={onSave}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-50 hover:bg-gray-900/90 h-9 px-4 py-2 shadow"
            >
                Save Changes
            </button>
        </header>
    );
}
