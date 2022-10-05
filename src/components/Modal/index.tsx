import React from "react";

const Modal = (props: { toggleModalFunc: any; data: any }) => {
  const validateConfig = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert('Functionality in progress');
  };

  return (
    <div id="modal" className="modal">
      <div className="modal-background"></div>

      <div className="modal-content">
        <form className="box">
          <button onClick={validateConfig}>Generate file</button>
        </form>
      </div>

      <button
        onClick={props.toggleModalFunc}
        className="modal-close is-large"
        data-target-modal="modal"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
