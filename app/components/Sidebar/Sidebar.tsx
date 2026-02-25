import React from 'react';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import { Node } from '@xyflow/react';

interface SidebarProps {
    selectedNode: Node | null;
    setSelectedNode: (node: Node | null) => void;
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    onAddNode: (type: string) => void;
}

export default function Sidebar({ selectedNode, setSelectedNode, setNodes, onAddNode }: SidebarProps) {
    return (
        <aside className="w-80 h-full border-l border-gray-200 bg-white shadow-[-4px_0_10px_rgba(0,0,0,0.02)] flex flex-col shrink-0">
            {selectedNode ? (
                <SettingsPanel
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    setNodes={setNodes}
                />
            ) : (
                <NodesPanel onAddNode={onAddNode} />
            )}
        </aside>
    );
}
