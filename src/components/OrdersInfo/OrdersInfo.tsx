import React from 'react';
import s from './OrdersInfo.module.css';
import cn from 'classnames';
import {useAppSelector} from "../../services/hooks";
import {IOrdersElement} from "../../services/types";

const OrdersInfo = () => {

    const {orders, total, totalToday} = useAppSelector(state => state.dataReducer.data)

    const ordersReady = orders?.filter((el: IOrdersElement) => el.status === 'done')

    const ordersInWork = orders?.filter((el: IOrdersElement) => el.status !== 'done')

    return (
        <div className={cn(s.container)}>
            <div className={cn(s.orders_container)}>
                <div>
                    <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                    <ul className={cn(s.orders_list, s.ready_color, s.columns_container, "text text_type_digits-default")}>
                        {ordersReady?.map((el: IOrdersElement) =>
                            <li className={cn(s.li_margin_bottom)} key={el._id}>{el.number}</li>)}
                    </ul>
                </div>
                <div>
                    <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                    <ul className={cn(s.orders_list, s.columns_container, "text text_type_digits-default")}>
                        {ordersInWork?.map((el: IOrdersElement) =>
                            <li className={cn(s.li_margin_bottom)} key={el._id}>{el.number}</li>)}
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <p className="text text_type_digits-large">{total}</p>
            </div>
            <div>
                <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                <p className="text text_type_digits-large">{totalToday}</p>
            </div>
        </div>
    );
};

export default OrdersInfo;