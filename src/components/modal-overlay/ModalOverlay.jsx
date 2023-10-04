import React from 'react';
import s from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({setActive}) => {
    return (
        <div onClick={() => setActive(false)} className={s.overlay}>
            
        </div>
    );
};

ModalOverlay.propTypes = {
    setActive: PropTypes.func
}
export default ModalOverlay;