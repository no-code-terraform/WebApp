import React from 'react'
import './index.scss'

const EditSidebar = (data: any, handleChange: any, editConfigs: any) => {
    return(
    <div
        className="details"
      >
        <h1>Edit Service</h1>
        {(() => {
          return data?.extras?.map((item: any) => {
            switch (true) {
              case item.type === "string" && item.choices == null:
                return (
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
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
                  <fieldset style={{marginTop: "10px"}} key={item.name}>
                    <label style={{marginRight: "10px"}} >{item.name}</label>
                    <select
                      className="config select is-info is-small"
                      data-name={item.name}
                      data-config-name={item?.name?.replace(".", "")}
                      defaultValue={item.default != null ? item.default : ""}
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
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
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
                  <fieldset style={{marginTop: "10px"}} key={item.name}>
                    <label style={{marginRight: "10px"}}>{item.name}</label>
                    <select
                      className="config select is-info is-small"
                      data-name={item.name}
                      data-config-name={item.name.replace(".", "")}
                      multiple
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
                  <fieldset key={item.name}>
                    <label>{item.name}</label>
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
                  <fieldset style={{marginTop: "10px"}} key={item.name}>
                    <label style={{marginRight: "10px"}}>{item.name}</label>
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
        <button style={{marginTop: "10px"}} className="button is-success is-light is-small" onClick={(e) => editConfigs(e)}>
          Validate the configuration
        </button>
      </div>
    )
}

export default EditSidebar