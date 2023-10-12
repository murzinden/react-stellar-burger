import React, {useMemo} from 'react';
import cn from "classnames"
import s from './BurgerIngredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";



const BurgerIngredient = ({item: ingredient, ingredientDetailsHandler}) => {
    const {items, bun} = useSelector(state => state.burgerConstructor)

    const count = useMemo(() => {
        let res = 0
        if (ingredient.type === 'bun' && bun && bun._id === ingredient._id) {
            res = 1
        }
        if (ingredient.type !== 'bun' && items) {
            res = items.filter(i => i._id === ingredient._id).length;
        }
        return res
    }, [items, bun])

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })


    return (
        <div
            ref={dragRef}
            onClick={() => ingredientDetailsHandler(ingredient)}
            className={cn(s.card, 'pl-4 pr-4')} style={{opacity: isDrag ? .2 : 1}}
        >
            <img className={cn(s.cards__img)} src={ingredient.image} alt={ingredient.name}/>
            <div className={cn(s.card__price, 'text text_type_digits-default')}>
                <p className={cn(s.card__digits)}>{ingredient.price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
            <p className={cn(s.card__description, 'text text_type_main-default')}>
                {ingredient.name}
            </p>
            {count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}
        </div>
    );
};
BurgerIngredient.propTypes = {
    item: ingredientPropType,
    ingredientDetailsHandler: PropTypes.func
}
export default BurgerIngredient;