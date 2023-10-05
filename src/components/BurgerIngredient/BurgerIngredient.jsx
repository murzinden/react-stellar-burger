import React, {useState} from 'react';
import cn from "classnames"
import s from './BurgerIngredient.module.css'
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {ingredientPropType} from "../../utils/prop-types";
import Modal from "../Modal/Modal";

const BurgerIngredient = ({item}) => {
    const [isActive, setActive] = useState(false)
    const handleClose = () => {
        setActive(false);
    };

    return (
        <>
            <div onClick={() => setActive(true)} className={cn(s.card, 'pl-4 pr-4')}>
                <img className={cn(s.cards__img)} src={item.image} alt={item.name}/>
                <div className={cn(s.card__price, 'text text_type_digits-default')}>
                    <p className={cn(s.card__digits)}>
                        {item.price}
                    </p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <p className={cn(s.card__description, 'text text_type_main-default' + '')}>
                    {item.name}
                </p>
                <Counter count={0} size="default" extraClass="m-1"/>
            </div>
            {isActive && <Modal onClose={handleClose}>
                <IngredientDetails item={item} />
            </Modal>}
        </>
    );
};
BurgerIngredient.propTypes = {
    item: ingredientPropType.isRequired
}
export default BurgerIngredient;