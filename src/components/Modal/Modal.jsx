import React, {useEffect, useMemo} from 'react';
import PropTypes from "prop-types";
import cn from "classnames"
import s from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {createPortal} from "react-dom";


const modalRoot = document.querySelector("#modal-root");
const Modal = ({children, closePopup}) => {

    const element = useMemo(() => document.createElement('div'), [])


    useEffect(() => {
        const closePopupByEscape = (e) => {
            if(e.key === 'Escape') {
                closePopup()
            }
        }
        modalRoot.appendChild(element)
        document.addEventListener('keydown', closePopupByEscape)
        return () => {
            modalRoot.removeChild(element)
            document.removeEventListener('keydown', closePopupByEscape)
        }

    }, [])

    return createPortal(
        <>
            <div className={cn(s.modal)}>
                <div className={cn(s.modal__closeIcon)}>
                    <CloseIcon type="primary" onClick={closePopup}/>
                </div>
                {children}
            </div>
            <ModalOverlay closePopup={closePopup}/>
        </> , element
    );
};

Modal.propTypes = {
    children: PropTypes.element,
    closePopup: PropTypes.func
}
export default Modal;