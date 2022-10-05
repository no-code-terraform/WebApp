import React from "react";

const Sidebar = (props: { addNodeFunc: any }): JSX.Element => {
// const Sidebar = (props: { addNodeFunc: any, services: any }): JSX.Element => {
  return (
    <aside className="menu">
      <p className="menu-label ">AWS Components</p>
      <ul className="menu-list">
        <li>
          <a className="is-active">Common</a>
          <ul>
            <li>
              <a onClick={() => props.addNodeFunc("item")}>item</a>
            </li>
            <li>
              <a>item</a>
            </li>
            <li>
              <a>item</a>
            </li>
          </ul>
        </li>

        <li>
          <a className="is-active">Compute</a>
          <ul>
            <li>
              <a>item</a>
            </li>
            <li>
              <a>item</a>
            </li>
            <li>
              <a>item</a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
