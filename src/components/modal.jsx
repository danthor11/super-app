import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    
    return (
        <div className="modal is-active">
            <div className={"modal-background"} onClick={props.onClose}></div>
            <div className={`${props.card && "modal-card"} card `} style={{borderRadius:`${props.rounded && "8px"}`}}>
                {props.onClose && 
                    <header className="modal-card-head">
                        <p className="modal-card-title has-text-centered<">{props.title}</p>
                    <button className="delete" aria-label="close" onClose={props.onClose} onClick={props.onClose}>x</button>
                        
                    </header>               
                }
                <section className="modal-card-body" style={{borderRadius:`${props.rounded && "8px"}`}}>
                    {props.children}
                </section>
            </div>
        </div>
    );
}

export default Modal;

export const ModalPortal = (props) => {
    
  return (
    ReactDOM.createPortal(<Modal onClose={props.onClose} title={props.title} rounded={props.rounded}>
        {props.children}
    </Modal>, 
    document.getElementById("modal")
    )
  )
}
