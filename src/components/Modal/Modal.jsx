import React, {useEffect} from 'react';
import cn from "classnames"
import s from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";


const Modal = ({children, onClose}) => {

    const modalRoot = document.querySelector("#modal-root");


    useEffect(() => {
        const closeModal = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", closeModal);

        return () => {
            document.removeEventListener("keydown", closeModal);
        };
    }, [onClose]);


    return createPortal(
        <>
            <div className={cn(s.modal)}>
                <div className={cn(s.modal__closeIcon)}>
                    <CloseIcon type="primary" onClick={onClose}/>
                </div>
                {children}
            </div>
            <ModalOverlay onClose={onClose}/>
        </> , modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func
}
export default Modal;