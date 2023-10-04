import React from 'react';
import cn from "classnames"
import s from './BurgerIngredientsCategory.module.css'
import BurgerIngredient from "../burger-ingredient/BurgerIngredient";
import {burgerPropType} from "../../utils/prop-types";

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
    burgerPropType
}
export default BurgerIngredientsCategory;