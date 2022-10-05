import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import { TextUpdaterNode } from "../TextUpdaterNode";
import Modal from "../Modal";
import "reactflow/dist/style.css";
import "./index.css";

const OverviewFlow = (props) => {
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  const toggleModal = (event) => {
    const modalToToggle = document.querySelector(
      `#${event.currentTarget.getAttribute("data-target-modal")}`
    );
    modalToToggle.classList.toggle("is-active");
  };

  return (
    <ReactFlow
      nodes={props.nodes}
      fitView
      nodeTypes={nodeTypes}
      attributionPosition="top-right"
    >
      <Modal toggleModalFunc={toggleModal}  />
      <button
        className="page-project__btnExport button is-link js-modal-trigger"
        onClick={toggleModal}
        data-target-modal="modal"
      >
        Export
      </button>
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
