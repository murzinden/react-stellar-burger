import React from 'react';
import s from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({closePopup}) => {
    
    return (
        <div
            onClick={() => {closePopup()}}
            className={s.overlay}
        >
        </div>
    );
};

ModalOverlay.propTypes = {
    closePopup: PropTypes.func
}
export default ModalOverlay;