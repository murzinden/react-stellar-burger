import {request} from "../../utils/api";
export const ADD_ITEMS = 'ADD_ITEMS'

export const addItems = (items) => {
    return {
        type: ADD_ITEMS,
        payload: {items}
    }
}
export const getAllItems = () => {
    return (dispatch) => {
        request('ingredients')
            .then(res => dispatch(addItems(res.data)))
            .catch(error => console.log('Error fetching data: ', error))
    }
}