import React, {useState} from 'react';
import cn from "classnames"
import s from './BurgerIngredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsCategory from "../BurgerIngredientsCategory/BurgerIngredientsCategory";


const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState('buns')
    const onSwitchTab = (tab: string) => {
        setCurrentTab(tab)
        const element = document.getElementById(tab)
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
        }
    }

    return (
        <section className={cn(s.cards)}>
            <div className={cn(s.tab__container, 'mb-10')}>
                <Tab
                    active={currentTab === 'buns'}
                    value={'buns'}
                    onClick={onSwitchTab}
                >
                    Булки
                </Tab>
                <Tab
                    active={currentTab === 'sauces'}
                    value={'sauces'}
                    onClick={onSwitchTab}
                >
                    Соусы
                </Tab>
                <Tab
                    active={currentTab === 'mains'}
                    value={'mains'}
                    onClick={onSwitchTab}
                >
                    Начинки
                </Tab>
            </div>
            <div className={cn(s.scroll__container)} data-cy="ingredients">
                <BurgerIngredientsCategory
                    setCurrentTab={setCurrentTab}
                />
            </div>
        </section>
    );
};

export default BurgerIngredients;