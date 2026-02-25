import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Node } from '@xyflow/react';

interface SettingsPanelProps {
    selectedNode: Node;
    setSelectedNode: (node: Node | null) => void;
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export default function SettingsPanel({ selectedNode, setSelectedNode, setNodes }: SettingsPanelProps) {
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
                <h2 className="text-base font-semibold text-gray-800">Message</h2>
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
