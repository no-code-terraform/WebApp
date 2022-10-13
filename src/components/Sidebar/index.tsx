import React, {useState} from "react";
import "./index.scss";

const Sidebar = (props: {
  addNodeFunc: any;
  jsonCurr: any;
  data: any;
}): JSX.Element => {
  const getNodeId = () => `id_${+new Date()}`;
  return (
    <div>
      <aside  className="menu">
      <p className="menu-label">List of services</p>
      <p className="menu-label">AWS</p>
      {props.data &&
        props.data.map((item: any) =>
          item.provider === "aws" ? (   
          <>
          <ul>
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
            {/* <a style={{ height: "25px", width:"25px", borderRadius:"50%" }} className="has-details">Info</a> */}
           <li style={{position: "relative"}}>
             <p>prout</p>
           <div className="details">{item.description} <a onClick={(e) => e.preventDefault()}>{item.url}</a></div>  
            </li> 
        </ul>
                </>
          ) : null
        )}
      <p className="menu-label">GCP</p>
      {props.data &&
        props.data.map((item: any) =>
          item.provider === "gcp" ? (
            <ul >
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
              <a>{item.name}</a>
            </li>
            <li className="details">{item.description} <a onClick={(e) => e.preventDefault()}>{item.url}</a></li>
        </ul>
          ) : null
        )}
    </aside>
    </div>
  );
};

export default Sidebar;
