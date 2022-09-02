const Modal = (props: { toggleModalFunc: any }) => {
    return (
        <div id="modal" className="modal">
            <div className="modal-background"></div>

            <div className="modal-content">
                <form className="box">
                  Form
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
