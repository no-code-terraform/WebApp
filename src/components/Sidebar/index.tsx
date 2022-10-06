import React from "react";

const Sidebar = (props: { addNodeFunc: any, data: any }): JSX.Element => {

  return (
    <aside className="menu">
      <p className="menu-label">List services</p>
      <ul className="menu-list">
        {props.data && props.data.map((item: any) => (
          <li key={item.name} onClick={() => props.addNodeFunc(item.name, item.extra)}>{item.name}</li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
