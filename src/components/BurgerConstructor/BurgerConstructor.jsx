import React, {useState} from 'react'
import cn from "classnames"
import s from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {burgerPropType} from "../../utils/prop-types";


const BurgerConstructor = ({burgerData}) => {
    const [isActive, setActive] = useState(false)
    const buns = burgerData.filter(el => el.type === 'bun')
    const mainsAndSauces = burgerData.filter(el => el.type !== 'bun')
    const handleClose = () => {
        setActive(false);
    };
    const getRandomArrIndex = array => {
        return Math.floor(Math.random() * array.length)
    }
    const randomBun = buns[getRandomArrIndex(buns)]
    let sum = randomBun.price * 2 + mainsAndSauces.reduce((acc, i) => acc + i.price, 0)

    return (
        <>
            <section className={cn(s.burger__constructor)}>
                <div className={cn(s.burger__item, 'ml-8 mb-4' + '')}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={randomBun.name + ' (верх)'}
                        thumbnail={randomBun.image}
                        price={randomBun.price}
                    />
                </div>
                <ul className={cn(s.burger__list, s.scroll__container)}>
                    {mainsAndSauces.map((item, index) =>
                        <li className={cn(s.burger__item, 'mb-4 mr-2 ml-4')} key={index}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={item.name}
                                thumbnail={item.image}
                                price={item.price}
                            />
                        </li>)}
                </ul>
                <div className={cn(s.burger__item, 'ml-8' + '')}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={randomBun.name + ' (низ)'}
                        thumbnail={randomBun.image}
                        price={randomBun.price}
                    />
                </div>
                <div className={cn(s.burger__order, 'mt-10')}>
                    <Button onClick={() => setActive(true)} htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                    <div className={cn(s.burger__price, 'mr-10')}>
                        <p className="text text_type_digits-medium">{sum}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </section>
            {
                isActive && <Modal onClose={handleClose}>
                    <OrderDetails/>
                </Modal>
            }
        </>
    );
};

BurgerConstructor.propTypes = {
    burgerData: burgerPropType.isRequired
}
export default BurgerConstructor;