import { ADD_TO_CART, GET_CART_DATA, GET_PRODUCTS, REMOVE_FROM_CART } from "../actions";

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

        case ADD_TO_CART:{

            const updatedCart = [...state.cart, action.payload];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return {
                ...state, 
                cart:[...state.cart, action.payload]
            }
        }
        
        case REMOVE_FROM_CART:
            {
                const updatedCart = state.cart.filter(item => item.id !== action.payload);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return {
                    ...state,
                    cart: [...updatedCart]
                }
            }
        case GET_CART_DATA:
            {
                const cartData = JSON.parse(localStorage.getItem('cart')) ?? [];

                return {
                    ...state,
                    cart: cartData
                }
            }

        default:
            return state;
    }
}