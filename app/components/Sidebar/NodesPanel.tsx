import React from 'react';
import { MessageSquareText } from 'lucide-react';

interface NodesPanelProps {
    onAddNode: (type: string) => void;
}

export default function NodesPanel({ onAddNode }: NodesPanelProps) {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="p-4 flex flex-col h-full">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 px-1">Nodes Panel</h2>
            <div className="flex gap-4 flex-wrap">
                <div
                    className="flex flex-col items-center justify-center w-32 h-24 border-2 border-blue-400 rounded-lg text-blue-500 cursor-pointer hover:bg-blue-50 transition-colors active:scale-95"
                    onDragStart={(event) => onDragStart(event, 'textNode')}
                    onClick={() => onAddNode('textNode')}
                    draggable
                >
                    <MessageSquareText size={28} className="mb-2" />
                    <span className="font-medium text-sm">Message</span>
                </div>
            </div>
        </div>
    );
}
