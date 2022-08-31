import React from "react";
import "./index.scss";
import "bulma/css/bulma.min.css";
import ReactLogo from './logo.svg';
import {Link} from "react-router-dom";

const Index = (): JSX.Element => {

  return (
    <React.Fragment>
      <div className="page-home">
        <img className="page-home__logo" src={ReactLogo} alt="Hetic Logo" />
        <h1 className="page-home__title title is-1">Tfmaker</h1>
        <p className="subtitle">Tfmaker, a GUI in your browser to draw your cloud infrastructure and generate your terraform files.</p>
        <Link className="page-home__link button is-outlined is-medium" to='/projects'>See the list of projects</Link>
      </div>
    </React.Fragment>
  );
};

export default Index;
