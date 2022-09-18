import React from 'react';
import { Button } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { decreaseQty, increaseQty, removeFromCart } from '../actions';
import { useDispatch } from 'react-redux';
import { success } from '../utils/Toast';


const CartItem = ({ item }) => {

    const { id, title, image, price, qty, subtotal } = item;
    const dispatch = useDispatch();
    const onDeleteCartItem = (id) =>{
        dispatch(removeFromCart(id));
        success('Product Removed From Cart!')
    }

    const onIncreaseQuantity = (id) =>{
        dispatch(increaseQty(id))
    }
    const onDecreaseQuantity = (id) =>{
        dispatch(decreaseQty(id))
    }

    return (
        <div className="cart__item">
            <div className="cart__item__image">
                <img src={image} alt={title} />
            </div>
            <div className="cart__item__text">
                {title}
            </div>
            <div className="cart__item__qty">
                <Button variant="contained" color="success" size="small" onClick={()=> onIncreaseQuantity(id)}><AddRoundedIcon /></Button>
                <span>{qty}</span>
                <Button variant="contained" color="error" onClick={() => onDecreaseQuantity(id)}><RemoveRoundedIcon /></Button>
            </div>

            <div className="cart__item__text">
                <span>Price Per Unit: </span>
                <div>₹ {price}.00</div>
            </div>
            <div className="cart__item__text">
                Subtotal: <div>₹ {subtotal}.00</div>
            </div>
            <div className="delete__btn">
                <Button variant='text' color="error" onClick={()=> onDeleteCartItem(id)}>
                    <DeleteRoundedIcon sx={{ fontSize: "2.5rem" }} titleAccess="Delete item" />
                </Button>
            </div>
        </div>
    )
}

export default CartItem;