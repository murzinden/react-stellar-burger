import React, {useEffect} from 'react';
import cn from 'classnames';
import s from "../components/App/App.module.css";
import OrderCardsContainer from "../components/OrderCardsContainer/OrderCardsContainer";
import {useAppDispatch} from "../services/hooks";
import {wsConnect, wsDisconnect} from "../services/reducers/web-socket/actions";
import {useLocation} from "react-router-dom";
import OrdersInfo from "../components/OrdersInfo/OrdersInfo";

const Order = () => {

    const dispatch = useAppDispatch()
    const url = 'wss://norma.nomoreparties.space/orders/all'
    const location = useLocation()
    useEffect(() => {
        dispatch(wsConnect(url))
        return () => {
            dispatch(wsDisconnect())
        }
    }, []);

    return (
        <section className={s.app}>
            <div className={cn(s.title)}>
                <h1 className={'text text_type_main-large mt-10'}>Лента заказов</h1>
                <main className={cn(s.order_feed_container)}>
                    <OrderCardsContainer/>
                    <OrdersInfo/>
                </main>
            </div>
        </section>
    );
};

export default Order;