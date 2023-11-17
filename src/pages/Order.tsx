import React, {useEffect} from 'react';
import cn from 'classnames';
import s from "../components/App/App.module.css";
import OrderCardsContainer from "../components/OrderCardsContainer/OrderCardsContainer";
import {useAppDispatch} from "../services/hooks";
import {wsConnect, wsDisconnect} from "../services/reducers/web-socket/actions";
import OrdersInfo from "../components/OrdersInfo/OrdersInfo";
import {WS_URL} from "../utils/api";

const Order = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(wsConnect(`${WS_URL}/all`))
        return () => {
            dispatch(wsDisconnect())
        }
    }, []);

    return (
        <section className={s.app}>
            <div className={cn(s.title)}>
                <h1 className={'text text_type_main-large mt-10'}>Лента заказов</h1>
            </div>
            <main className={cn(s.order_feed_container)}>
                <OrderCardsContainer/>
                <OrdersInfo/>
            </main>
        </section>
    );
};

export default Order;