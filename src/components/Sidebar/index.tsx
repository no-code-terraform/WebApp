import React from "react";

const Sidebar = (props: {
  addNodeFunc: any;
  jsonCurr: any;
  data: any;
}): JSX.Element => {
  const getNodeId = () => `id_${+new Date()}`;
  return (
    <aside className="menu">
      <p className="menu-label">List of services</p>
      <p className="menu-label">AWS</p>
      {props.data &&
        props.data.map((item: any) =>
          item.provider === "aws" ? (
            <li
              key={item.name}
              onClick={() => {
                props.addNodeFunc(
                  item.name,
                  item.provider,
                  item.tf_key,
                  item.extra,
                  getNodeId()
                );
              }}
            >
              <a>{item.name}</a>
            </li>
          ) : null
        )}
      <p className="menu-label">GCP</p>
      {props.data &&
        props.data.map((item: any) =>
          item.provider === "gcp" ? (
            <li
              key={item.name}
              onClick={() => {
                props.addNodeFunc(
                  item.name,
                  item.provider,
                  item.tf_key,
                  item.extra,
                  getNodeId()
                );
              }}
            >
              <a>{item.name}</a>
            </li>
          ) : null
        )}
    </aside>
  );
};

export default Sidebar;
