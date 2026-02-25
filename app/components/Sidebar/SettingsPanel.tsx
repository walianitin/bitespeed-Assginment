import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Node, useReactFlow } from '@xyflow/react';
import toast from 'react-hot-toast';

interface SettingsPanelProps {
    selectedNode: Node;
    setSelectedNode: (node: Node | null) => void;
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export default function SettingsPanel({ selectedNode, setSelectedNode, setNodes }: SettingsPanelProps) {
    // Utility hook from react flow to permanently delete nodes/edges
    const { deleteElements } = useReactFlow();

    // Update the label data object inside the React Flow node state array
    // This immediately triggers a re-render on the canvas, showing the new text context
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    node.data = {
                        ...node.data,
                        label: newText,
                    };
                }
                return node;
            })
        );
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b border-gray-200">
                <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                    <ArrowLeft size={20} className="text-gray-600" />
                </button>
                <h2 className="text-base font-semibold text-gray-800 flex-1">Message</h2>
                <button
                    onClick={() => {
                        deleteElements({ nodes: [{ id: selectedNode.id }] });
                        setSelectedNode(null);
                        toast.success('Node deleted');
                    }}
                    className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                    title="Delete Node"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="p-4 flex-1">
                <label className="block text-sm font-medium text-gray-500 mb-2">
                    Text
                </label>
                <textarea
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                    value={selectedNode.data.label as string}
                    onChange={handleTextChange}
                    placeholder="Enter message text..."
                />
            </div>
        </div>
    );
}
