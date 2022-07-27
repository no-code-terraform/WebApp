const Modal = () => {
    return (
        <div id="modal" className="modal">
            <div className="modal-background"></div>

            <div className="modal-content">
                <div className="box">
                    <p>Modal</p>
                </div>
            </div>

            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    );
};

export default Modal;
