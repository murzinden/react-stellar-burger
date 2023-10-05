import React from 'react';
import cn from "classnames"
import s from '../Modal/Modal.module.css'
import {ingredientPropType} from "../../utils/prop-types";
const IngredientDetails = ({item}) => {
    return (
        <div className='pt-15 pb-15 pl-10 pr-10' onClick={e => e.stopPropagation()}>
            <div className={cn(s.modal__header)}>
                <p className={"text text_type_main-large"}>Детали ингредиента</p>
            </div>
            <div className={cn(s.modal__info)}>
                <img src={item.image_large} alt={item.name} className='mb-4'/>
                <p className="text text_type_main-medium mb-8">{item.name}</p>
                <div className={cn(s.nutritional__block)}>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
                    </div>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
                    </div>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
                    </div>
                    <div className={cn(s.nutritional__value)}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredientPropType
}
export default IngredientDetails;