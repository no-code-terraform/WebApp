import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import 'reactflow/dist/style.css';

import { TextUpdaterNode } from "../TextUpdaterNode";

const OverviewFlow = (props) => {
const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <ReactFlow
      nodes={props.data.nodes}
      edges={props.data.edges}
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
