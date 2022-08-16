import React from "react";
import "bulma/css/bulma.min.css";
import {Link} from "react-router-dom";

const Projects = (): JSX.Element => {

  return (
    <React.Fragment>
      <div className="main-content columns">
        <section className='section'>
          List project
          <Link to='/project'>Test</Link>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Projects;
