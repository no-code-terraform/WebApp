import { Handle, Position } from "reactflow";
// import "reactflow/dist/style.css";
import "bulma/css/bulma.min.css";

export const TextUpdaterNode = ({ data }: any) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="text-updater-node">
        <p>ami: ami-085925f297f89fce1</p>
        <p>instance_type: t2.micro</p>
        <p>ports: [8080]</p>
        <p>count: 1</p>
        <button className="js-modal-trigger" data-target="modal-js-example">
          Edit
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <div id="modal-js-example" className="modal">
        <div className="modal-background"></div>

        <div className="modal-content">
          <div className="box">
            <p>Modal JS example</p>
          </div>
        </div>

        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    </>
  );
};
