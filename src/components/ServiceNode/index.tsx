import React, {useRef, useState} from "react";
import { Handle, Position } from "reactflow";
import "bulma/css/bulma.min.css";

export const ServiceNode = ({ data }: any) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const editConfigs = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let serviceWithConfig: {} = {};
    setIsOpen(true)

    // @ts-ignore
    const config = ref.current.querySelectorAll('.config');

    config.forEach((item: any) => {
      // @ts-ignore
      if (item.dataset.configType) serviceWithConfig[item.dataset.configName] = item.value.split(',');

      else {

        if (item.dataset.configName.split('.')[1]) {

          // @ts-ignore
          serviceWithConfig[item.dataset.configName.split('.')[0]] = {};

        } else {

          // @ts-ignore
          serviceWithConfig[item.dataset.configName] = item.value;

        }
      }
    })

    config.forEach((item: any) => {
      if (item.dataset.configName.split('.')[1]) {
        // @ts-ignore
        serviceWithConfig[item.dataset.configName.split('.')[0]][item.dataset.configName.split('.')[1]] = '';
      }
    })

    data.updateServiceInJsonFunc(data.provider, data.tf_key, data.extras, serviceWithConfig)
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      {isOpen ? (
        <div className="text-updater-node">
          <p>Service : {data.label}</p>
          {data.extras && data.extras.map((item: any) => (
            <p key={item.name}>{item.name} : {item?.default}</p>
          ))}
          <button
            onClick={() => setIsOpen(false)}
          >
            Edit
          </button>
        </div>
      ) : (
        <div ref={ref} className="text-updater-node">
          <h1>Edit Service</h1>
          {(() => {
            return data.extras.map((item: any) => {
              switch (true) {
                case (item.type === "string" && item.choices == null): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    {item.choices}
                    <input
                      className="input config"
                      data-config-name={item.name}
                      type="text"
                    />
                  </fieldset>
                )
                case (item.type === "string" && item.choices != null): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <select
                      className="config"
                      data-config-name={item.name}
                    >
                      {item.choices && item.choices.map((option: any) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </fieldset>
                )
                case (item.type === "array" && item.choices == null && item.is_multiple_choice == null): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <input
                      className="input config"
                      data-config-name={item.name}
                      data-config-type={item.type}
                      type="text"
                    />
                    <p>please separate with commas</p>
                  </fieldset>
                )
                case (item.type === "array" && item.choices != null && item.is_multiple_choice == true): return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <select
                      className="config"
                      data-config-name={item.name}
                      multiple
                    >
                      {item.choices && item.choices.map((option: any) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </fieldset>
                )
                case item.type === "integer": return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <input
                      className="input config"
                      data-config-name={item.name}
                      type="number"
                      min={item?.min}
                      max={item?.max}
                    />
                  </fieldset>
                )
                case item.type === "boolean": return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
                    <select
                      className="config"
                      data-config-name={item.name}
                    >
                      <option value='true'>yes</option>
                      <option value='false'>no</option>
                    </select>
                  </fieldset>
                )
                default: return
              }
            })
          })()}
          <button onClick={(e) => editConfigs(e)}>Validate the configuration</button>
        </div>
      )}
    </>
  );
};
