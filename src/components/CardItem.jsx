import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartData, getProductsData } from '../actions';
import { success } from '../utils/Toast';
import { deleteProduct } from '../utils/ApiUtils';

const CardItem = ({product}) => {
    const { id, title, description, image, price, rating: { rate, count }} = product;

    const dispatch = useDispatch();

    const cartData = useSelector(state => state.cart);

    const onAddToCart = (product) =>{

        dispatch(getCartData());
        dispatch(addToCart(product));
        success('Product Added to Cart!')
    }

    const onDeleteProduct = async (id) =>{
        if(window.confirm('Do you want to delete this product?')){
           const response = await deleteProduct(id);
           console.log(response);
           dispatch(getProductsData());
           success('Product deleted successfully!')
        }
    }

    return (
        <div className='card'>
            <div className="product__image">
                <img src={image} alt={title} />
            </div>
            <div className="product__info">
                <div className="info__left">
                    <div className="info__text">
                        <span className='product__title'>{title}</span>
                        <span className='product__price'>₹ {price}.00</span>
                    </div>

                    <div className="ratings">
                        <span>
                            <Rating name="half-rating-read" defaultValue={rate} precision={0.5} readOnly />
                        </span>
                        <span className='rating__count'>({count})</span>
                    </div>
                </div>
                <div className="info__right">
                    <span className="product__desc">
                        {description.substr(0, 150)}...
                    </span>
                    <div className="actions">
                        <Button 
                            startIcon={<AddShoppingCartRoundedIcon/>} variant="contained" color="success"
                            onClick={()=> onAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                        <EditIcon sx={styles.edit} />
                        <DeleteIcon 
                            sx={styles.delete} 
                            onClick={()=> onDeleteProduct(product.id)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    edit: {
        fontSize: '2.3rem',
        color: '#1D3557',
        cursor: 'pointer'
    },
    delete: {
        fontSize: '2.3rem',
        color: '#E63946',
        cursor: 'pointer'
    }
}

export default CardItem;