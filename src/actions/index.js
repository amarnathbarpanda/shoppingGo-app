import { getProducts } from "../utils/ApiUtils";

//action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';

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