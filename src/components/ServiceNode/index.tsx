import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import "bulma/css/bulma.min.css";

export const ServiceNode = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(data)

  return (
    <>
      <Handle type="target" position={Position.Top} />
      {isOpen ? (
        <div className="text-updater-node">
          <p>Service : {data.label}</p>
          {data.extras && data.extras.map((item: any) => (
            <p key={item.name}>{item.name} : </p>
          ))}
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
          {(() => {
            return data.extras.map((item: any) => {
              switch (true) {
                case (item.type === "string" && item.choices == null): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    {item.choices}
                    <input
                      className="input"
                      type="text"
                      placeholder="ami-085925f297f89fce1"
                    />
                  </fieldset>
                )
                case (item.type === "string" && item.choices != null): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <select>
                      {item.choices.map((option: any) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </fieldset>
                )
                case (item.type === "array" && item.choices == null && item.is_multiple_choice == false): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <input
                      className="input"
                      type="text"
                      placeholder="ami-085925f297f89fce1"
                    />
                    <p>please separate with commas</p>
                  </fieldset>
                )
                case (item.type === "array" && item.choices != null && item.is_multiple_choice == true): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <select multiple>
                      {item.choices.map((option: any) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </fieldset>
                )
                case item.type === "integer": return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <input
                      className="input"
                      type="number"
                      placeholder="ami-085925f297f89fce1"
                    />
                  </fieldset>
                )
                case item.type === "boolean": return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <select>
                      <option value='yes'>yes</option>
                      <option value='no'>no</option>
                    </select>
                  </fieldset>
                )
                default: return
              }
            })
          })()}
          <button onClick={() => setIsOpen(true)}>Edit</button>
        </div>
      )}
    </>
  );
};
