import React, {useEffect, useState} from 'react';
import s from './OrderDetailsInfo.module.css'
import cn from 'classnames';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {showOrderInfo} from "../../services/slice/orderSlice";
import {IUniqueType} from "../../utils/types";


const OrderDetailsInfo = () => {

    const {order, ingredients, totalPrice} = useAppSelector(state => state.orderSlice.orderInfo)
    const [uniqueIngredients, setUniqueIngredients] = useState<IUniqueType>({});
    const dispatch = useAppDispatch();
    const date = () => {
        if (order) {
            const dateFromServer = order.createdAt
            return <FormattedDate date={new Date(dateFromServer)}/>
        }
    }

    useEffect(() => {
        const order = localStorage.getItem("orderInfo");
        if (order) {
            const orderInfo = JSON.parse(order);
            dispatch(showOrderInfo(orderInfo));
        }
    }, []);

    useEffect(() => {
        if (ingredients) {
            const unique: IUniqueType = {};

            ingredients.forEach(item => {
                if (unique[item._id] && unique[item._id].count) {
                    const count = unique[item._id].count as number;
                    unique[item._id].count = count + 1;
                } else {
                    unique[item._id] = { ...item, count: 1 };
                }
            });
            setUniqueIngredients(unique);
        }
    }, [ingredients]);

    useEffect(() => {
        console.log("uniqueIngredients", uniqueIngredients);
    }, [uniqueIngredients]);

    return (
        <div className={cn(s.container, "pt-15 pb-15 pl-10 pr-10")}>
            <div className={cn(s.heading)}>
                <p className="text text_type_digits-default">{order?.number}</p>
            </div>
            <p className="text text_type_main-medium mt-10">{order?.name}</p>
            {order?.status === "done" ? (
                <p className={cn(s.status_ready, "text text_type_main-default mt-3")}>
                    Выполнен
                </p>
            ) : (
                <p className={"text text_type_main-default mt-3"}>Готовится</p>
            )}
            <p className="text text_type_main-medium mt-15">Состав:</p>
            <div className={cn(s.scroll__container, "mt-6")}>
                <ul className={cn(s.items_info)}>
                    {Object.keys(uniqueIngredients)?.map(el => {
                        const { image_mobile, price, name, count } = uniqueIngredients[el];
                        return (
                            <li className={cn(s.item)} key={el}>
                                <img className={cn(s.image)} src={image_mobile} alt={name} />
                                <p className={cn(s.item_name, "text text_type_main-default")}>
                                    {name}
                                </p>
                                <div className={cn(s.price)}>
                                    <p className="text text_type_digits-default">
                                        {count} x {price}
                                    </p>
                                    <CurrencyIcon type={"primary"} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <footer className={cn(s.footer, "mt-10")}>
                <p className="text text_type_main-default text_color_inactive">
                    {date()}
                </p>
                <div className={cn(s.footer_total)}>
                    <p className="text text_type_digits-default">{totalPrice}</p>
                    <CurrencyIcon type={"primary"} />
                </div>
            </footer>
        </div>
    );
};

export default OrderDetailsInfo;