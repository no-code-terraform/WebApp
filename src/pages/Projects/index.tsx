import React from "react";
import "bulma/css/bulma.min.css";
import "./index.scss";
import PreviewProject from "../../components/PreviewProject";
import {data} from "./data";

const Index = (): JSX.Element => {

  return (
    <React.Fragment>
      <div className="page-projects">
        <div className="container">
          <h1 className="page-projects__title title is-1">List of projects</h1>
          <ul className="columns">
            {data.map(project =>
                <li className="column is-4" key={project.id}>
                  <PreviewProject data={project}/>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
