import React, {useMemo} from 'react'
import cn from "classnames"
import s from './BurgerConstructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components"
import {useDispatch, useSelector} from "react-redux";
import BurgerConstructorElement from "../BurgerConstructorElement/BurgerConstructorElement";
import {useDrop} from "react-dnd";
import {addItem} from "../../services/slice/constructorSlice";
import {useLocation, useNavigate} from "react-router-dom";


const BurgerConstructor = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const {items, bun} = useSelector(state => state.constructorSlice)
    const {isUserLoaded} = useSelector(state => state.userSlice)
    const navigate = useNavigate()

    const finalPrice = useMemo(() => {
        let res = 0
        if (bun) {
            res += bun.price * 2
        }
        if (items) {
            res += items.reduce((acc, i) => acc + i.price, 0)
        }
        return res
    }, [items, bun])

    const [{isOver, canDrop, itemDrag}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop: (item) => (
            dispatch(addItem(item))
        ),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            itemDrag: monitor.getItem()
        })
    })

    const onClickHandler = () => {
        if (bun && items && isUserLoaded) {
            navigate('/order', {state: {background: location}})
        } else {
            navigate('/login')
        }
    }


    return (
        <>
            <section className={cn(s.burger__constructor)} ref={dropTarget}>
                {bun && <div className={cn(s.burger__item, 'ml-8 mb-4')}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        thumbnail={bun.image}
                        price={bun.price}
                    />
                </div>}
                <ul className={cn(s.burger__list, s.scroll__container)}>
                    {items?.map((item, index) => {
                        return (<BurgerConstructorElement
                            key={item.uuid}
                            index={index}
                            item={item}
                        />)
                    })
                    }
                </ul>
                {bun && <div className={cn(s.burger__item, 'ml-8')}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ' (низ)'}
                        thumbnail={bun.image}
                        price={bun.price}
                    />
                </div>}
                <div className={cn(s.burger__order, 'mt-10')}>
                    <Button disabled={!bun && items} onClick={onClickHandler} htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                    <div className={cn(s.burger__price, 'mr-10')}>
                        <p className="text text_type_digits-medium">{finalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BurgerConstructor;