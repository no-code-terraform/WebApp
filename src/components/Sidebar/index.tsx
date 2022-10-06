import React from "react";

const Sidebar = (props: { addNodeFunc: any, updateJsonFunc: any, jsonCurr: any, data: any }): JSX.Element => {

  const getNodeId = () => `_${+new Date()}`;

  return (
    <aside className="menu">
      <p className="menu-label">List services</p>
      <ul className="menu-list">
        {props.data && props.data.map((item: any) => (
          <li
            key={item.name}
            onClick={() => {
              props.updateJsonFunc(item.provider, item.tf_key, item.extra, null, getNodeId());
              props.addNodeFunc(item.name, item.provider, item.tf_key, item.extra)
            }}>
            {item.name}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
