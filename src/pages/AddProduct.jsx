import React, { useState } from 'react';
import { Button } from '@mui/material';

import './AddProduct.css';
import { addProduct } from '../utils/ApiUtils';
import { success, warning } from '../utils/Toast';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {

  const [product, setProduct] = useState({
    id: 0,
    image: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    rating: {
      rate: 0,
      count: 0
    }
  });

  const navigate = useNavigate();

  const onHandleChange = (event) => {
    if (event.target.name === 'rate' || event.target.name === 'count') {
      setProduct({
        ...product,
        rating: {
          ...product.rating,
          [event.target.name]: event.target.value
        }
      });
      return;
    }
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();


    setProduct({ ...product, id: Date.now() })

    if (!product.image || !product.title || !product.description || !product.category || !product.price || !product.rating.rate || !product.rating.count){
      warning('Please fill all the details');
    }else{
      const response = await addProduct(product);
      console.log(response);
  
      success('Product added successfully!');
      navigate('/');
    }

  }

  return (
    <div className='add__product'>
      <h1>Add Product</h1>
      <form className='form'>
        <input type="text"
          className="input"
          placeholder='Image Url'
          name="image" id=""
          onChange={(event) => onHandleChange(event)}
          required
        />
        <input type="text"
          className="input"
          placeholder='Title'
          name="title" id=""
          onChange={(event) => onHandleChange(event)}
          required
        />
        <input type="text"
          className="input"
          placeholder='Description'
          name="description" id=""
          onChange={(event) => onHandleChange(event)}
          required
        />
        <input type="number"
          className="input"
          placeholder='Price'
          name="price" id=""
          onChange={(event) => onHandleChange(event)}
          required
        />
        <div className="input__cat">
          <label htmlFor="category">Category: </label>
          <select id='category'
            onChange={(event) => onHandleChange(event)}
            name='category'
            required
          >
            <option value="accessories">Accessories</option>
            <option value="food">Food</option>
            <option value="electronics">Electronics</option>
            <option value="clothes">Clothes</option>
          </select>
        </div>
        <input type="number"
          className="input"
          placeholder='Rating'
          min={1} max={5} step={0.5}
          name="rate" id=""
          onChange={(event) => onHandleChange(event)}
          required
        />
        <input type="number"
          className="input"
          placeholder='Rating count'
          name="count" id=""
          onChange={(event) => onHandleChange(event)}
          required
        />

        <Button type="submit" sx={{ fontSize: 'var(--text-primary)', width: '80%', marginTop: '2rem' }} variant="contained" color="success" onClick={(e) => onSubmit(e)}>Add</Button>
      </form>
    </div>
  )
}

export default AddProduct;