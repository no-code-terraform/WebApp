import React, {useEffect, useMemo, useState} from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import "./index.css";

import { ServiceNode } from "../ServiceNode";

const OverviewFlow = (props) => {
  const [nodes, changeNodes] = useState(props.nodes);
  const nodeTypes = useMemo(() => ({ textUpdater: ServiceNode }), []);

  useEffect(() => {
    changeNodes(props.nodes);
  }, [props.nodes]);

  return (
    <>
    <ReactFlow
      nodes={nodes}
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
    </>
  );
};

export default OverviewFlow;
