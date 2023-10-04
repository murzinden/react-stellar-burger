import React, {useEffect, useRef} from 'react';
import cn from "classnames"
import s from './Modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/ModalOverlay";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";


const Modal = ({children, setActive}) => {

    const element = useRef(document.createElement('div')).current
    const closeModal = e => {
        if (e.key === 'Escape') {
            setActive(false)
        }
    }

    useEffect(() => {
        const modalRoot = document.querySelector('#modal-root')
        if (modalRoot) {
            modalRoot.appendChild(element)
            document.addEventListener('keydown', closeModal)

            return () => {
                modalRoot.removeChild(element)
                document.removeEventListener('keydown', closeModal)
            }
        }
    }, [element])

    return createPortal(
        <>
            <div className={cn(s.modal)}>
                <div className={cn(s.modal__closeIcon)}>
                    <CloseIcon type="primary" onClick={() => setActive(false)}/>
                </div>
                {children}
            </div>
            <ModalOverlay setActive={setActive}/>
        </> , element
    );
};

Modal.propTypes = {
    children: PropTypes.element,
    setActive: PropTypes.func
}
export default Modal;