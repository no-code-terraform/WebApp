import React from "react";
// @ts-ignore
import * as FileSaver from 'file-saver';

const Modal = (props: { toggleModalFunc: any }) => {

  const generateJsonFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    const blob = new Blob(["Welcome to Tfmaker"],
      { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "static.txt");
  };

  return (
      <div id="modal" className="modal">
          <div className="modal-background"></div>

          <div className="modal-content">
              <form className="box">
                <button
                  onClick={generateJsonFile}>
                  Generate file
                </button>
              </form>
          </div>

          <button
            onClick={props.toggleModalFunc}
            className="modal-close is-large"
            data-target-modal="modal"
            aria-label="close"></button>
      </div>
  );
};

export default Modal;
