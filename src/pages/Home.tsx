import React from "react";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import "bulma/css/bulma.min.css";

const Home = (): JSX.Element => {

  const toggleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    const modalToToggle: HTMLElement = document.querySelector(`#${event.currentTarget.getAttribute('data-target')}`);
    modalToToggle.classList.toggle('is-active')
  };

  return (
    <React.Fragment>
      <section className="main-content columns is-fullheight">
        <Modal />
        <Sidebar />

        <div className="container column is-10">
          <p>React flow</p>
          <button className="js-modal-trigger" onClick={toggleModal} data-target="modal">
            Open JS example modal
          </button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
