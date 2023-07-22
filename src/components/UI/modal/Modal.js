import "./Modal.css"
import ReactDOM  from 'react-dom'
const Modal = ({ children , visible , closeModal }) => {

    if(!visible){
        return null
    }
    return ReactDOM.createPortal(
        <div className="Modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={(e)=> e.stopPropagation()}>
                {children}
            </div>
        </div>
    ,document.querySelector("#modal-root"))
}

export default Modal