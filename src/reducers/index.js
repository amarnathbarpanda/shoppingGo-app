import { ADD_TO_CART, DECREASE_QUANTITY, GET_CART_DATA, GET_PRODUCTS, INCREASE_QUANTITY, REMOVE_FROM_CART } from "../actions";

const initialState = {
    productData: [],
    cart: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                productData: [...action.payload]
            }

        case ADD_TO_CART: {

            const updatedCart = [...state.cart, { ...action.payload, qty: 1 }];

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, qty: 1 }]
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

        case INCREASE_QUANTITY:
            {
                const updatedCart = state.cart.map((currProduct => {
                    if (currProduct.id === action.payload)
                        return {
                            ...currProduct, qty: currProduct.qty + 1
                        }
                    return currProduct;
                }))
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return {
                    ...state, cart: updatedCart
                }
            }
        
        case DECREASE_QUANTITY:
            {
                const updatedCart = state.cart.map((currProduct => {
                    if (currProduct.id === action.payload)
                        return {
                            ...currProduct, qty: currProduct.qty - 1
                        }
                    return currProduct;
                })).filter((curItem) => {
                    return curItem.qty !== 0;
                });
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return {
                    ...state, cart: updatedCart
                }
            }

        default:
            return state;
    }
}