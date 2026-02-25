# React Flow Messaging Application
> **Assignment by Nitin Walia** 

A dynamic, drag-and-drop flowchart builder designed to create and manage messaging node sequences. Built with React Flow, Next.js, and styled with Tailwind CSS.

## 🚀 Features
- **Drag & Drop Canvas:** Add message nodes seamlessly by dragging them from the panel or clicking them for auto-placement.
- **Dynamic Connections:** Visually connect nodes together to document conversation flows.
- **Smart Edge Routing:** 
  - Source handles (Right side) are restricted to strictly **1 outgoing connection**.
  - Target handles (Left side) effortlessly accept **multiple incoming connections**.
- **Integrated Node Editing:** Click on any node to open the settings panel to update the text message or delete the node entirely.
- **Smooth UX:** Includes loading skeletons, toast notifications (`react-hot-toast`), dotted backgrounds, and zoom-to-fit auto focus.
- **Validation Engine:** Automatically validates the board state to ensure nodes aren't left floating without incoming connections before saving.

---

## 📁 Project Structure

```text
my-app/
├── app/
│   ├── components/
│   │   ├── Flow/
│   │   │   └── TextNode.tsx        # The custom visual node component (handles, icons, text).
│   │   ├── Header/
│   │   │   └── Header.tsx          # Top nav bar containing the assignment branding and Save validation logic.
│   │   ├── Home/
│   │   │   └── Main.tsx            # The core engine. Manages state, the React Flow instance, and canvas events.
│   │   └── Sidebar/
│   │       ├── Sidebar.tsx         # The right-hand column container.
│   │       ├── NodesPanel.tsx      # Draggable toolbox containing the spawnable 'Message' block.
│   │       └── SettingsPanel.tsx   # Editor panel that appears when a node is selected (text editing/deletion).
│   ├── globals.css                 # Global Tailwind imports.
│   └── page.tsx                    # Next.js root entry point.
└── package.json                    # Project dependencies (React Flow, Lucide Icons, Hot Toast).
```

---

## 🔄 Core Data Flow
1. **State Management (`Main.tsx`)**
   - The application relies on two primary arrays of state: `nodes` and `edges`.
   - When the user drags a node from `NodesPanel.tsx` and drops it onto the `<ReactFlow>` canvas, `Main.tsx` intercepts the `onDrop` event, calculates the screen-to-flow coordinates using `reactFlowInstance`, and pushes it to the `nodes` array.
2. **Node Rendering (`TextNode.tsx`)**
   - React Flow iterates over the `nodes` array. When it encounters a type of `textNode`, it mounts our custom `TextNode.tsx` component, passing down the data.
3. **Connections**
   - When a user draws a line between the Source Handle and Target Handle, the `onConnect` function in `Main.tsx` validates the edge rules (preventing multiple source outputs) before committing the line to the `edges` array.
4. **Mutating Nodes (`SettingsPanel.tsx`)**
   - Clicking a node triggers `onSelectionChange`, opening the Settings sidebar.
   - Editing the text area fires `handleTextChange`, mapping over the `nodes` array and dynamically updating the text label in real-time on the canvas. 

---

## 🛠️ Installation & Setup
1. Clone the repository and navigate into the `my-app` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to start building flows!
