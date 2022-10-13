import React, {useEffect, useRef, useState} from "react";
import { Handle, Position } from "reactflow";
import "bulma/css/bulma.min.css";
import EditSidebar from "../EditSidebar";
import { ReactComponent as Awslogo } from "../../asset/logo/ec2.svg";
import { ReactComponent as Gcplogo } from "../../asset/logo/gcp.svg";
import { ReactComponent as Gearlogo } from "../../asset/logo/gear.svg";

export const ServiceNode = ({ data }: any) => {
  const ref = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [showRequired, setshowRequired] = useState(true);

  const handleRequired = (status: boolean) => {
    console.log("LOLOL", status, !status)
    setshowRequired(!status)
  } 

  console.log(data)
  const editConfigs = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let serviceWithConfig: any = {};
    setIsOpen(true);

    const config = ref?.current?.querySelectorAll(".config");

    config?.forEach((item: any) => {
      if (item.dataset.configType)
        serviceWithConfig[item.dataset.name] = item.value.split(",");
      else {
        if (item.dataset.name.split(".")[1]) {
          serviceWithConfig[item.dataset.name.split(".")[0]] = {};
        } else {
          serviceWithConfig[item.dataset.name] = item.value;
        }
      }
    });

    config?.forEach((item: any) => {
      if (item.dataset.name.split(".")[1]) {
        serviceWithConfig[item.dataset.name.split(".")[0]][
          item.dataset.name.split(".")[1]
        ] = item.value;
      }
    });

    const configServiceWithId = { ...serviceWithConfig, id: data.id };

    data.updateConfigInJson(
      data.provider,
      data.tf_key,
      data.extras,
      configServiceWithId,
      data.id
    );
  };

  const handleChange = (e: any, name: any) => {
    console.log(e)
    console.log(name)
    const configText = ref?.current?.querySelector(
      `[data-config-text=${name?.replace(".", "")}]`
    );
    const configInput = ref?.current?.querySelector(
      `[data-config-name=${name?.replace(".", "")}]`
    );

    configText.innerHTML = e.target.value;
    configInput.value = e.target.value;
  };

  const displayHidden = (isRequired: any, showRequired: boolean): string => {
    if (showRequired && !isRequired) {
      return "none"
    } 
    return "block"
  }

  return (
    <>
      <div className={'serviceNode-' + data.id} ref={ref}>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
        <div
          className="text-updater-node"
          style={{ display: isOpen ? "" : "none" }}
        >
          <h1
            style={{
              marginBottom: "20px",
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {data.provider === "aws" ? (
              <Awslogo
                style={{ height: "20px", width: "20px", marginRight: "10px" }}
              />
            ) : (
              <Gcplogo
                style={{ height: "20px", width: "20px", marginRight: "10px" }}
              />
            )}{" "}
            <strong>{data.label}</strong>
          </h1>
          {data.extras &&
            data.extras.map((item: any) => { 
              const display: string = displayHidden(item.is_required, showRequired);
              return (
               <p style={{ marginTop: "7px", display: display }} key={item.name}>
              <strong>{`${item.name}: `}</strong>
              <span data-config-text={item?.name?.replace(".", "")}>
                {(item.type === "array" &&
                item.choices != null &&
                item.is_multiple_choice == true ? item.choices[0] : item?.default)}
              </span>
            </p> 
            )})}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
          <a
            style={{ marginTop: "5px" }}
            className="button is-small is-primary"
            onClick={() => setIsOpen(false)}
          >
            Edit
          </a>
          <p
            onClick={() => handleRequired(showRequired)}
          >
            <Gearlogo style={{ marginTop: "5px", height:"25px", width:"25px" }}/>
          </p>
        </div>
        </div>
        <div
          className="text-updater-node"
          style={{ display: isOpen ? "none" : "" }}
        >
          {isOpen ? (
            <EditSidebar
              data={data}
              handleChange={handleChange}
              editConfigs={editConfigs}
            />
          ) : null}
          <h1><strong>Edit Service</strong></h1>
          {(() => {
            return data.extras.map((item: any) => {
              const display: string = displayHidden(item.is_required, showRequired);
              switch (true) {
                case item.type === "string" && item.choices == null:
                  return (
                    <fieldset style={{ display: display }} key={item.name}>
                      <label><strong>{item.name}</strong></label>
                      {item.choices}
                      <input
                        className="input config is-info is-small"
                        data-name={item.name}
                        data-config-name={item?.name?.replace(".", "")}
                        type="text"
                        defaultValue={item.default != null ? item.default : ""}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                    </fieldset>
                  );
                case item.type === "string" && item.choices != null:
                  return (
                    <fieldset style={{ marginTop: "10px", display: display }} key={item.name}>
                      <label style={{ marginRight: "10px" }}><strong>{item.name}</strong></label>
                      <select
                        className="config select is-info is-small"
                        data-name={item.name}
                        data-config-name={item?.name?.replace(".", "")}
                        // @ts-ignore
                        defaultValue={{ label: item.choices[0], value: item.choices[0] }}
                        onChange={(e) => handleChange(e, item.name)}
                      >
                        {item.choices &&
                          item.choices.map((option: any) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    </fieldset>
                  );
                case item.type === "array" &&
                  item.choices == null &&
                  item.is_multiple_choice == null:
                  return (
                    <fieldset style={{ marginTop: "10px", display: display }} key={item.name}>
                      <label><strong>{item.name}</strong></label>
                      <input
                        className="input config is-info is-small"
                        data-name={item.name}
                        data-config-name={item?.name?.replace(".", "")}
                        data-config-type={item.type}
                        type="text"
                        defaultValue={item.default != null ? item.default : ""}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                      <p>please separate with commas</p>
                    </fieldset>
                  );
                case item.type === "array" &&
                  item.choices != null &&
                  item.is_multiple_choice == true:
                  return (
                    <fieldset style={{ marginTop: "10px", display: display }} key={item.name}>
                      <label style={{ marginRight: "10px" }}><strong>{item.name}</strong></label>
                      <select
                        className="config select is-info is-small"
                        data-name={item.name}
                        data-config-name={item.name.replace(".", "")}
                        // @ts-ignore
                        defaultValue={{ label: item.choices[0], value: item.choices[0] }}
                        onChange={(e) => handleChange(e, item.name)}
                      >
                        {item.choices &&
                          item.choices.map((option: any) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    </fieldset>
                  );
                case item.type === "integer":
                  return (
                    <fieldset style={{ marginTop: "10px", display: display }} key={item.name}>
                      <label><strong>{item.name}</strong></label>
                      <input
                        className="input config is-info is-small"
                        data-name={item.name}
                        data-config-name={item?.name?.replace(".", "")}
                        type="number"
                        min={item?.min}
                        max={item?.max}
                        defaultValue={item.default != null ? item.default : ""}
                        onChange={(e) => handleChange(e, item.name)}
                      />
                    </fieldset>
                  );
                case item.type === "boolean":
                  return (
                    <fieldset style={{ marginTop: "10px", display: display }} key={item.name}>
                      <label style={{ marginRight: "10px" }}><strong>{item.name}</strong></label>
                      <select
                        className="config select is-info is-small"
                        data-name={item.name}
                        data-config-name={item?.name?.replace(".", "")}
                        defaultValue={
                          item.default != null ? item.default : null
                        }
                        onChange={(e) => handleChange(e, item.name)}
                      >
                        <option value="true">yes</option>
                        <option value="false">no</option>
                      </select>
                    </fieldset>
                  );
                default:
                  return;
              }
            });
          })()}
        <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", marginTop: "15px"}}>
        <button
            style={{ marginTop: "10px" }}
            className="button is-success is-light is-small"
            onClick={(e) => editConfigs(e)}
          >
            Validate the configuration
          </button>
          <p
            style={{ right:0, marginTop: "10px" }}
            onClick={() => handleRequired(showRequired)}
          >
            <Gearlogo style={{ marginTop: "5px", height:"25px", width:"25px" }}/>
          </p>
        </div>
        </div>
      </div>
    </>
  );
};
