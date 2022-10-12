import React from "react";
import "./index.scss";

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
        <ul className="has-details">
            <li
              className="has-details"
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
              <a href={item.name}>{item.name}</a>
            </li>
            <li className="details">{item.description} <a>{item.url}</a></li>
        </ul>
          ) : null
        )}
      <p className="menu-label">GCP</p>
      {props.data &&
        props.data.map((item: any) =>
          item.provider === "gcp" ? (
            <ul className="has-details">
            <li
              className="has-details"
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
              <a href={item.name}>{item.name}</a>
            </li>
            {/* <li className="details">{item.description} <a>{item.url}</a></li> */}
        </ul>
          ) : null
        )}
    </aside>
  );
};

export default Sidebar;
