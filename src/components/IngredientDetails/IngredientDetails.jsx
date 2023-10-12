import React, {useEffect} from 'react';
import cn from "classnames"
import s from '../Modal/Modal.module.css'
import {ingredientPropType} from "../../utils/prop-types";
import {useDispatch, useSelector} from "react-redux";
import {clearIngredientInfo} from "../../services/actions/ingredientDetailsAction";


const IngredientDetails = () => {

    const {ingredient} = useSelector(state => state.ingredientDetails)
    const dispatch = useDispatch()
    useEffect(() => {
        return () => dispatch(clearIngredientInfo())
    }, []);

    return (
        <div className='pt-15 pb-15 pl-10 pr-10' onClick={e => e.stopPropagation()}>
            <div className={cn(s.modal__header)}>
                <p className={"text text_type_main-large"}>Детали ингредиента</p>
            </div>
            <div className={cn(s.modal__info)}>
                <img src={ingredient.image_large} alt={ingredient.name} className='mb-4'/>
                <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
                <div className={cn(s.nutritional__block)}>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                    </div>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                    </div>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                    </div>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: ingredientPropType
}
export default IngredientDetails;