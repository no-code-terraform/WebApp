import React from "react";
import Sidebar from "../components/Sidebar";
import "bulma/css/bulma.min.css";

const Home = () => {
  return (
    <React.Fragment>
      <section className="main-content columns is-fullheight">
        <Sidebar />

        <div className="container column is-10">
          <p>React flow</p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
