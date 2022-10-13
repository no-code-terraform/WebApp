import React, {useState} from "react";
import "./index.scss";

const Sidebar = (props: {
  addNodeFunc: any;
  jsonCurr: any;
  data: any;
}): JSX.Element => {
  const getNodeId = () => `id_${+new Date()}`;
  const [awsOption, setAwsOption] = useState(false)
  const [gcpOption, setGcpOption] = useState(false)
  return (
    <div>
      <aside  className="menu">
      <p className="menu-label">List of services</p>
      <a onClick={() => setAwsOption(!awsOption)} className="menu-label"><strong>AWS</strong></a>
      <div style={{ display: awsOption ? "block" : "none", marginTop: "10px;", marginBottom: "10px" }}>
        <p style={{ marginTop: "10px"}}>region: <input style={{ width: "100px" }}/></p>
        <button  style={{ marginTop: "15px"}} className="button is-success is-small" onClick={() => setAwsOption(true)}>test</button>
      </div>
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
        </ul>
                </>
          ) : null
        )}
      <a onClick={() => setGcpOption(!gcpOption)} className="menu-label"><strong>GCP</strong></a>
      <div style={{ display: gcpOption ? "block" : "none", marginTop: "10px;", marginBottom: "10px" }}>
        <p style={{ marginBottom: "10px", marginTop: "10px"}}>region: <input style={{ width: "100px" }}/></p>
        <p>project: <input style={{ width: "100px" }}/></p>
        <button style={{ marginTop: "15px"}} className="button is-success is-small" onClick={() => setAwsOption(true)}>test</button>
      </div>
      {props.data &&
        props.data.map((item: any) =>
          item.provider === "gcp" ? (
            <ul >
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
        </ul>
          ) : null
        )}
    </aside>
    </div>
  );
};

export default Sidebar;
