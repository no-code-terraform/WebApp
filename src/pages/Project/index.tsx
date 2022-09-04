import React from "react";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import OverviewFlow from "../../components/Example";
import "bulma/css/bulma.min.css";
import {useLocation} from "react-router-dom";
import "./index.scss";

const Index = (): JSX.Element => {
  const data = useLocation();

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const modalToToggle: HTMLElement = document.querySelector(`#${event.currentTarget.getAttribute('data-target-modal')}`) as HTMLInputElement;
    modalToToggle.classList.toggle('is-active')
  };

  return (
    <React.Fragment>
      <section className="page-project columns">
        <Modal toggleModalFunc={toggleModal}/>
        <div className="column is-2">
          <Sidebar />
        </div>
        <div className="column is-10">
          <p>React flow</p>
          <button className="js-modal-trigger" onClick={toggleModal} data-target-modal="modal">
            Open JS example modal
          </button>
          <OverviewFlow />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
