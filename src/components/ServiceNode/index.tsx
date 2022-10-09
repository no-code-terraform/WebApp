import React, {useRef, useState} from "react";
import { Handle, Position } from "reactflow";
import "bulma/css/bulma.min.css";

export const ServiceNode = ({ data }: any) => {
  const ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(true);

  const editConfigs = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let serviceWithConfig: any = {};
    setIsOpen(true)

    const config = ref?.current?.querySelectorAll('.config');

    config?.forEach((item: any) => {
      if (item.dataset.configType) serviceWithConfig[item.dataset.name] = item.value.split(',');

      else {
        if (item.dataset.name.split('.')[1]) {
          serviceWithConfig[item.dataset.name.split('.')[0]] = {};

        } else {
          serviceWithConfig[item.dataset.name] = item.value;

        }
      }
    })

    config?.forEach((item: any) => {
      if (item.dataset.name.split('.')[1]) {
        serviceWithConfig[item.dataset.name.split('.')[0]][item.dataset.name.split('.')[1]] = item.value;
      }
    })

    const configServiceWithId = { ...serviceWithConfig, id: data.id };

    data.updateConfigInJson(data.provider, data.tf_key, data.extras, configServiceWithId, data.id)
  }

  const handleChange = (e: any, name: any) => {
    const configText = ref?.current?.querySelector(`[data-config-text=${name.replace('.', "")}]`);
    const configInput = ref?.current?.querySelector(`input[data-config-name=${name.replace('.', "")}]`);

    configText.innerHTML = e.currentTarget.value
    configInput.value = e.currentTarget.value;
  }

  return (
    <>
      <div ref={ref}>
        <Handle type="target" position={Position.Top} />
          <div className="text-updater-node" style={{display: isOpen ? '':'none'}}>
            <p>Service : {data.label}</p>
            {data.extras && data.extras.map((item: any) => (
              <p key={item.name}>{item.name} :
                <span data-config-text={item.name.replace('.', "")}>{item?.default}</span></p>
            ))}

            <button
              onClick={() => setIsOpen(false)}
            >
              Edit
            </button>
          </div>
          <div className="text-updater-node" style={{display: isOpen ? 'none':''}}>
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
                        data-name={item.name}
                        data-config-name={item.name.replace('.', "")}
                        type="text"
                        defaultValue={item.default != null ? item.default : ''}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                    </fieldset>
                  )
                  case (item.type === "string" && item.choices != null): return (
                    <fieldset key={item.name}>
                      <label>{item.name}</label>
                      <select
                        className="config"
                        data-name={item.name}
                        data-config-name={item.name.replace('.', "")}
                        defaultValue={item.default != null ? item.default : ''}
                        onChange={(e) => handleChange(e, item.name)}
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
                        data-name={item.name}
                        data-config-name={item.name.replace('.', "")}
                        data-config-type={item.type}
                        type="text"
                        defaultValue={item.default != null ? item.default : ''}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                      <p>please separate with commas</p>
                    </fieldset>
                  )
                  case (item.type === "array" && item.choices != null && item.is_multiple_choice == true): return (
                    <fieldset key={item.name}>
                      <label>{item.name}</label>
                      <select
                        className="config"
                        data-name={item.name}
                        data-config-name={item.name.replace('.', "")}
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
                        data-name={item.name}
                        data-config-name={item.name.replace('.', "")}
                        type="number"
                        min={item?.min}
                        max={item?.max}
                        defaultValue={item.default != null ? item.default : ''}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                    </fieldset>
                  )
                  case item.type === "boolean": return (
                    <fieldset key={item.name}>
                      <label>{item.name}</label>
                      <select
                        className="config"
                        data-name={item.name}
                        data-config-name={item.name.replace('.', "")}
                        defaultValue={item.default != null ? item.default : null}
                        onChange={(e) => handleChange(e, item.name)}
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
      </div>
    </>
  );
};
