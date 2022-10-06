import React, { useState } from "react";
import { Handle, Position } from "reactflow";
// import "reactflow/dist/style.css";
import "bulma/css/bulma.min.css";

export const ServiceNode = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      {isOpen ? (
        <div className="text-updater-node">
          <p>ami: ami-085925f297f89fce1</p>
          <p>instance_type: t2.micro</p>
          <p>ports: [8080]</p>
          <p>count: 1</p>
          <button
            onClick={() => setIsOpen(false)}
            className="js-modal-trigger"
            data-target="modal-js-example"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="text-updater-node">
          <h1>Edit Service</h1>
          <p>ami:</p>
          <input
            className="input"
            type="text"
            placeholder="ami-085925f297f89fce1"
          />
          <p>instance_type:</p>
          <input className="input" type="text" placeholder="t2.micro" />

          <p>ports:</p>
          <input className="input" type="text" placeholder="8080" />

          <p>count:</p>
          <input className="input" type="text" placeholder="1" />

          <button onClick={() => setIsOpen(true)}>Edit</button>
        </div>
      )}
    </>
  );
};
