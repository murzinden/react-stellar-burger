import React, {useEffect} from 'react';
import cn from "classnames"
import s from './BurgerIngredientsCategory.module.css'
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";



const BurgerIngredientsCategory = ({setCurrentTab, ingredientDetailsHandler}) => {
    const {data} = useSelector(state => state.ingredients)
    const buns = data.filter(el => el.type === 'bun')
    const mains = data.filter(el => el.type === 'main')
    const sauces = data.filter(el => el.type === 'sauce')

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0
    })
    const [mainsRef, inViewMains] = useInView({
        threshold: 0
    })
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0
    })

    useEffect(() => {
        if (inViewBuns) {
            setCurrentTab('buns')
        } else if (inViewSauces) {
            setCurrentTab('sauces')
        } else if (inViewMains) {
            setCurrentTab('mains')
        }
    }, [inViewBuns, inViewSauces, inViewMains]);

    return (
        <>
            <section id='buns' ref={bunsRef}>
                <h2 className={"text text_type_main-medium mb-6"}>Булки</h2>
                <div className={cn(s.cards__gallery, 'pl-4 pr-4')}>
                    {buns.map((item) => <BurgerIngredient ingredientDetailsHandler={ingredientDetailsHandler}
                                                          key={item._id} item={item}/>)}
                </div>
            </section>
            <section id='sauces' ref={saucesRef}>
                <h2 className={"text text_type_main-medium mb-6"}>Соусы</h2>
                <div className={cn(s.cards__gallery, 'pl-4 pr-4')}>
                    {sauces.map((item) => <BurgerIngredient ingredientDetailsHandler={ingredientDetailsHandler}
                                                            key={item._id} item={item}/>)}
                </div>
            </section>
            <section id='mains' ref={mainsRef}>
                <h2 className={"text text_type_main-medium mb-6"}>Начинки</h2>
                <div className={cn(s.cards__gallery, 'pl-4 pr-4')}>
                    {mains.map((item) => <BurgerIngredient ingredientDetailsHandler={ingredientDetailsHandler}
                                                           key={item._id} item={item}/>)}
                </div>
            </section>
        </>
    );
};
BurgerIngredientsCategory.propTypes = {
    setCurrentTab: PropTypes.func,
    ingredientDetailsHandler: PropTypes.func
}
export default BurgerIngredientsCategory;