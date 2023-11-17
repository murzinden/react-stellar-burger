import React, {FC} from 'react';
import s from './ModalOverlay.module.css'
import {useLocation} from "react-router-dom";

interface IProps {
    closePopup: (path: string) => void
}

const ModalOverlay: FC<IProps> = ({closePopup}) => {

    const location = useLocation()

    return (
        <div
            onClick={() => closePopup(location.pathname)}
            className={s.overlay}
        >
        </div>
    );
};

export default ModalOverlay;