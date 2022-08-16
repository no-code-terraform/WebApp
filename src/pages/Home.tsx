import React from "react";
import "bulma/css/bulma.min.css";
import {Link} from "react-router-dom";

const Home = (): JSX.Element => {

  return (
    <React.Fragment>
      <div className="main-content columns">
        <section className="section">
          Home
          <Link to='/projects'>Test</Link>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Home;
