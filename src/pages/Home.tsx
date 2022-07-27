import React from "react";
import Sidebar from "../components/Sidebar";
import OverviewFlow from "../components/Example";
import "bulma/css/bulma.min.css";

const Home = () => {
  return (
    <React.Fragment>
      <section className="main-content columns">
        <Sidebar />
        <div className="container column is-10">
          <OverviewFlow />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
