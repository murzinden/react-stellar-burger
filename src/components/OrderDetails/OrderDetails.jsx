import React, {useEffect} from 'react';
import cn from "classnames"
import s from '../Modal/Modal.module.css'
import orderImagesDone from '../../images/done.png'
import {useDispatch, useSelector} from "react-redux";
import {getOrderResponse, resetOrderNumber} from "../../services/actions/orderAction";


const OrderDetails = () => {
    const dispatch = useDispatch()
    const {items, bun} = useSelector(state => state.burgerConstructor)
    const {orderNumber} = useSelector(state => state.orderDetails)
    const idArray = items?.map(el => el._id)
    idArray.push(bun?._id)
    useEffect(() => {
        dispatch(getOrderResponse(idArray))
        return () => dispatch(resetOrderNumber())
    }, [])


    return (
        <div className='pt-15  pb-30 pl-10 pr-10' onClick={e => e.stopPropagation()}>
            <div className={cn(s.modal__header)}>
                <p className={"text text_type_main-large"}></p>
            </div>
            <div className={cn(s.modal__info)}>
                <p className="text text_type_digits-large mb-8">
                    {orderNumber === 0 ? 'Loading' : orderNumber}
                </p>
                <p className="text text_type_main-medium">идентификатор заказа</p>
                <img className={'mb-15 mt-15'} src={orderImagesDone} alt="подтверждение заказа"/>
                <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive mb-2">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    );
};

export default OrderDetails;