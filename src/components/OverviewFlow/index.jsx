import React, { useMemo, useCallback } from "react";
import ReactFlow, { addEdge, MiniMap, Controls, Background, useNodesState, useEdgesState, } from "reactflow";
import 'reactflow/dist/style.css';

import { TextUpdaterNode } from "../TextUpdaterNode";

const OverviewFlow = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.data.edges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      attributionPosition="top-right"
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";

          return "#eee";
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;

          return "#fff";
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
