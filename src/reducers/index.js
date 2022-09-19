import { ADD_PRODUCT, ADD_TO_CART, DECREASE_QUANTITY, GET_CART_DATA, GET_CART_TOTAL, GET_PRODUCTS, INCREASE_QUANTITY, REMOVE_FROM_CART } from "../actions";

const initialState = {
    productData: [],
    cart: [],
    cartTotal: 0,
    noOfCartItems: 0
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                productData: [...action.payload]
            }

        case ADD_TO_CART: {
            //if the product already present in the cart then no need to add it just increase its quantity

            const existingProduct = state.cart.find(elem => elem.id === action.payload.id);

            if (existingProduct) {
                existingProduct.qty++;
                existingProduct.subtotal = existingProduct.qty * existingProduct.price;
                localStorage.setItem('cart', JSON.stringify(state.cart));
                return {
                    ...state,
                    noOfCartItems: state.noOfCartItems + 1,
                    cartTotal: state.cartTotal + action.payload.price
                }
            }

            //if not present then add it to cart
            const updatedCart = [...state.cart, { ...action.payload, qty: 1, subtotal: action.payload.price }];

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            const newSubtotal = action.payload.qty * action.payload.price;
            return {
                ...state,
                cart: [
                    ...state.cart,
                    {
                        ...action.payload,
                        qty: 1,
                        subtotal: newSubtotal
                    }
                ],
                noOfCartItems: state.noOfCartItems + 1,
                cartTotal: state.cartTotal + action.payload.price
            }
        }

        case REMOVE_FROM_CART:
            {
                const productToBeRemoved = state.cart.find(item => item.id === action.payload);
                const updatedCart = state.cart.filter(item => item.id !== action.payload);
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                return {
                    ...state,
                    cart: [...updatedCart],
                    noOfCartItems: state.noOfCartItems - productToBeRemoved.qty,
                    cartTotal: state.cartTotal - productToBeRemoved.subtotal
                }
            }
        case GET_CART_DATA:
            {
                const cartData = JSON.parse(localStorage.getItem('cart')) ?? [];
                let count = 0;
                state.cart.forEach(item => {
                    count += item.qty
                });
                
                return {
                    ...state,
                    cart: cartData,
                    noOfCartItems: count
                }
            }

        case INCREASE_QUANTITY:
            {
                const updatedCart = state.cart.map((currProduct => {
                    if (currProduct.id === action.payload) {
                        const newSubtotal = currProduct.price * (currProduct.qty + 1);
                        return {
                            ...currProduct,
                            qty: currProduct.qty + 1,
                            subtotal: newSubtotal
                        }
                    }
                    return currProduct;
                }))
                const priceToBeAdded = state.cart.find(item => item.id === action.payload);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return {
                    ...state, cart: updatedCart,
                    noOfCartItems: state.noOfCartItems + 1,
                    cartTotal: state.cartTotal + priceToBeAdded.price
                }
            }

        case DECREASE_QUANTITY:
            {
                const updatedCart = state.cart.map((currProduct => {
                    if (currProduct.id === action.payload) {
                        const newSubtotal = currProduct.price * (currProduct.qty - 1);
                        return {
                            ...currProduct,
                            qty: currProduct.qty - 1,
                            subtotal: newSubtotal
                        }
                    }
                    return currProduct;
                })).filter((curItem) => {
                    return curItem.qty !== 0;
                });
                const priceToDeducted = state.cart.find(item => item.id === action.payload);

                localStorage.setItem('cart', JSON.stringify(updatedCart));
                return {
                    ...state, cart: updatedCart,
                    noOfCartItems: state.noOfCartItems - 1,
                    cartTotal: state.cartTotal - priceToDeducted.price
                }
            }

        case GET_CART_TOTAL: {
            let cartTotal = 0;
            state.cart.forEach((product) => cartTotal += product.subtotal);

            return {
                ...state,
                cartTotal: cartTotal
            }
        }

        default:
            return state;
    }
}