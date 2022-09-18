import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData, getCartTotal } from '../actions';
import CartItem from '../components/CartItem';

import './Cart.css';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const cartData = useSelector(state => state.cart);
  const cartTotal = useSelector(state => state.cartTotal);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCartData()); // to set order total and subtoal of recently added product
    dispatch(getCartTotal());
  },[]);

  //whenever the cartData changes the cartItems state will be updated
  useEffect(() => {
    setCartItems(cartData);
  }, [cartData]);

  useEffect(() => {
    setOrderTotal(cartTotal);
  }, [cartTotal]);
  
  return (
    <div className='cart'>
      <div className="cart_container">
        <h1 className='cart__item__title'>Product Cart</h1>
        {cartItems.length > 0 ? (cartItems.map(item => (
          <CartItem key = {item.id} item = {item}/>
        ))): (<Typography variant="h4">No item in cart! Please add some items.</Typography>)}
        <div className="order__total">
          {orderTotal > 0 && <h1 className="order__total">Order Total: ₹ {orderTotal}.00</h1>}
        </div>
      </div>
    </div>
  )
}

export default Cart;