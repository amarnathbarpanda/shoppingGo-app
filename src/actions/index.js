import { getProducts } from "../utils/ApiUtils";

//action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CART_DATA = 'GET_CART_DATA';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

//action creators

//return a function instead of plain object which is an issue
// to solve this issue
export const getProductsData = () => async (dispatch) =>{
    const apiResponse = await getProducts(); 
    

    dispatch({
        type: GET_PRODUCTS,
        payload: apiResponse
    })
}

export const getCartData = () =>{
    return{
        type: GET_CART_DATA
    }
}

export const addToCart = (product) =>{
    return{
        type: ADD_TO_CART,
        payload: product
    }
}
export const removeFromCart = (id) =>{
    return{
        type: REMOVE_FROM_CART,
        payload: id
    }
}

export const increaseQty = (id) =>{
    return{
        type: INCREASE_QUANTITY,
        payload: id
    }
}

export const decreaseQty = (id) =>{
    return{
        type: DECREASE_QUANTITY,
        payload: id
    }
}


