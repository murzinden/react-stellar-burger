import React from 'react';
import cn from "classnames"
import s from './BurgerIngredientsCategory.module.css'
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import {burgerPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";

const BurgerIngredientsCategory = ({burgerData, title}) => {

    return (
        <>
            <h2 className={"text text_type_main-medium mb-6"}>{title}</h2>
            <div className={cn(s.cards__gallery, 'pl-4 pr-4')}>
                {burgerData.map(item =>
                    <BurgerIngredient key={item._id} item={item}/>
                )}
            </div>
        </>
    );
};
BurgerIngredientsCategory.propTypes = {
    burgerData: burgerPropType.isRequired,
    title: PropTypes.string.isRequired
}
export default BurgerIngredientsCategory;