const Modal = (props: { toggleModalFunc: any }) => {
    return (
        <div id="modal" className="modal">
            <div className="modal-background"></div>

            <div className="modal-content">
                <form className="box">
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Text input"/>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input className="input is-success" type="text" placeholder="Text input" value=""/>
                    </div>
                    <p className="help is-success">This username is available</p>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input className="input is-danger" type="email" placeholder="Email input" value=""/>
                    </div>
                    <p className="help is-danger">This email is invalid</p>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                      <button className="button is-link is-light">Cancel</button>
                    </div>
                  </div>
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
