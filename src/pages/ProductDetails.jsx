import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart, getCartData } from '../actions';
import { getProductById } from '../utils/ApiUtils';
import { success } from '../utils/Toast';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';


import './ProductDetails.css';

const ProductDetails = () => {
    
    const {id} = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});

    useEffect(()=>{
      (async () =>{
        const response = await getProductById(id);
        setProduct(response);
      })();
    },[]);
  console.log(product?.rating?.rate);

  const onAddToCart = () => {

    dispatch(getCartData());
    dispatch(addToCart(product));
    success('Product Added to Cart!')
  }


  return (
    <div className="product__details">
      <div className="item__image">
        <img src={product?.image} alt={product?.title} />
      </div>
      <div className="item__details">
        <h3 className="item__title">{product?.title}</h3>
        <p className="item__desc">
          {product?.description}
        </p>
        <p className="item__cat">
          <span>Category: </span>{product?.category}
        </p>
        <p className="item__price">
          <span>Price: </span>₹ {product?.price}.00
        </p>
        <p className="item__rate">
          <span>Rating: </span>
          {product?.rating?.rate} 
        </p>
        <p className="item__rate">
          <span>Ratings Count: </span> 
          {product?.rating?.count}
        </p>
        <Button
          startIcon={<AddShoppingCartRoundedIcon />} variant="contained" color="success"
          onClick={() => onAddToCart()}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductDetails;