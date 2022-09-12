import { GET_PRODUCTS } from "../actions";

const initialState = {
    productData: [],
    cart: [],
}

export default function reducer (state = initialState, action){
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state, 
                productData: [...action.payload]
            }
        
        default:
            return state;
    }
}