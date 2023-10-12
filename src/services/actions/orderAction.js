import {request} from "../../utils/api";
import {clearConstructor} from "./constructorAction";


export const GET_ORDER = 'GET_ORDER'
export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER'

export const getOrderNumber = (number) => {
    return {
        type: GET_ORDER,
        payload: number
    }
}

export const getOrderResponse = (array) => {
    return (dispatch) => {
        request('orders',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ingredients: array
                })
            })
            .then(res => {
                dispatch(getOrderNumber(res.order.number))
                dispatch(clearConstructor())
            })
            .catch(console.error)
    }
}

export const resetOrderNumber = () => {
    return {
        type: RESET_ORDER_NUMBER
    }
}