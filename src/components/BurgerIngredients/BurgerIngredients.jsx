import React, {useState} from 'react';
import cn from "classnames"
import s from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../BurgerIngredientsCategory/BurgerIngredientsCategory";
import {burgerPropType} from "../../utils/prop-types";

const BurgerIngredients = ({burgerData}) => {
    const [current, setCurrent] = useState('Булки')
    return (
        <section className={cn(s.cards)}>
            <div className={cn(s.tab__container, 'mb-10')}>
                <Tab
                    active={current === 'Булки'}
                    value={'Булки'}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    active={current === 'Соусы'}
                    value={'Соусы'}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    active={current === 'Начинки'}
                    value={'Начинки'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <div className={cn(s.scroll__container)}>
                {current === 'Булки' && <BurgerIngredientsCategory burgerData={burgerData.filter(el => el.type === 'bun')} title="Булки" />}
                {current === 'Соусы' && <BurgerIngredientsCategory burgerData={burgerData.filter(el => el.type === 'sauce')} title="Соусы" />}
                {current === 'Начинки' && <BurgerIngredientsCategory burgerData={burgerData.filter(el => el.type === 'main')} title="Начинки" />}
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
    burgerData: burgerPropType.isRequired
}
export default BurgerIngredients;