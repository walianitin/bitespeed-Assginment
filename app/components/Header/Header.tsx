import React from 'react';
import { Node, Edge } from '@xyflow/react';

interface HeaderProps {
    nodes: Node[];
    edges: Edge[];
}

export default function Header({ nodes, edges }: HeaderProps) {
    const onSave = () => {
        // Validation logic
        // 1. More than one node
        // 2. More than one node has empty target handles (no incoming edges)

        let emptyTargets = 0;

        for (const node of nodes) {
            // Check if this node is the target of any edge
            const hasIncomingEdge = edges.some(edge => edge.target === node.id);
            if (!hasIncomingEdge) {
                emptyTargets++;
            }
        }

        if (nodes.length > 1 && emptyTargets > 1) {
            alert('Cannot save Flow. More than one node has empty target handles.');
        } else {
            alert('Flow saved successfully!');
        }
    };

    return (
        <header className="h-16 w-full flex items-center justify-end px-6 bg-gray-50 border-b border-gray-200 shrink-0">
            <button
                onClick={onSave}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded font-medium hover:bg-blue-50 transition-colors"
            >
                Save Changes
            </button>
        </header>
    );
}
