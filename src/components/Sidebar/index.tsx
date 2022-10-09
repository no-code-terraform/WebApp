import React from "react";

const Sidebar = (props: { addNodeFunc: any, jsonCurr: any, data: any }): JSX.Element => {

  const getNodeId = () => `id_${+new Date()}`;

  return (
    <aside className="menu">
      <p className="menu-label">List services</p>
      <ul className="menu-list">
        {props.data && props.data.map((item: any) => (
          <li
            key={item.name}
            onClick={() => {
              props.addNodeFunc(item.name, item.provider, item.tf_key, item.extra, getNodeId())
            }}>
            {item.name}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
