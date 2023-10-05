import React from 'react';
import s from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
          onClose()
      }
    }
    
    return (
        <div onClick={handleOverlayClick} className={s.overlay}>
            
        </div>
    );
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func
}
export default ModalOverlay;