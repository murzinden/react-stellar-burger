import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredientsReducer";
import {constructorReducer} from "./constructorReducer";
import {orderReducer} from "./orderReducer";
import {ingredientDetailsReducer} from "./ingredientDetailsReducer";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
})