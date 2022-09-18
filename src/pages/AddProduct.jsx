import React, { useState } from 'react';
import { Button } from '@mui/material';

import './AddProduct.css';
import { addProduct } from '../utils/ApiUtils';


const AddProduct = () => {

  const [product, setProduct] = useState({});

  const onHandleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  const onAddProduct = async () => {
    setProduct({ ...product, id: Date.now() })
    const response = await addProduct(product);
    console.log(response);
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
        />
        <input type="text"
          className="input"
          placeholder='Title'
          name="title" id=""
          onChange={(event) => onHandleChange(event)}
        />
        <input type="text"
          className="input"
          placeholder='Description'
          name="description" id=""
          onChange={(event) => onHandleChange(event)}
        />
        <input type="number"
          className="input"
          placeholder='Price'
          name="" id=""
          onChange={(event) => onHandleChange(event)}
        />
        <div className="input__cat">
          <label htmlFor="category">Category: </label>
          <select id='category'
            onChange={(event) => onHandleChange(event)}
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
          name="" id=""
          onChange={(event) => onHandleChange(event)}
        />
        <input type="number"
          className="input"
          placeholder='Rating count'
          name="" id=""
          onChange={(event) => onHandleChange(event)}
        />

        <Button sx={{ fontSize: 'var(--text-primary)', width: '80%', marginTop: '2rem' }} variant="contained" color="success" onClick={() => onAddProduct()}>Add</Button>
      </form>
    </div>
  )
}

export default AddProduct;