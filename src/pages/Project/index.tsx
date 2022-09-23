import React from "react";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import OverviewFlow from "../../components/Example";
import "bulma/css/bulma.min.css";
import "./index.scss";

const Index = (): JSX.Element => {

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
        <div className="column is-10e">
          <div className="p-1 is-flex is-justify-content-space-between is-align-items-center">
            <p>Title</p>
            <button className="page-project__btnExport button is-link js-modal-trigger" onClick={toggleModal} data-target-modal="modal">
              Export
            </button>
          </div>
          <OverviewFlow />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
