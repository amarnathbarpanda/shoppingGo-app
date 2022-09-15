import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData } from '../actions';
import CartItem from '../components/CartItem';

import './Cart.css';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const cartData = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCartData());
  },[]);

  useEffect(() => {
    setCartItems(cartData);
  }, [cartData])
  

  return (
    <div className='cart'>
      <div className="cart_container">
        <h1 className='cart__item__title'>Product Cart</h1>
        {cartItems.length > 0 ? (cartItems.map(item => (
          <CartItem key = {item.id} item = {item}/>
        ))): (<Typography variant="h4">No item in cart! Please add some items.</Typography>)}
        <div className="order__total">
          
        </div>
      </div>
    </div>
  )
}

export default Cart;