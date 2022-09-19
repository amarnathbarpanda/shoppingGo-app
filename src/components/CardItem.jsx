import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartData, getProductsData } from '../actions';
import { success } from '../utils/Toast';
import { deleteProduct, updateProduct } from '../utils/ApiUtils';

const CardItem = ({ product }) => {
    const { id, title, description, image, price, rating: { rate, count } } = product;

    const [edit, setEdit] = useState(false);

    const [values, setValues] = useState({});

    useEffect(()=>{
        console.log(values);
    }, [edit])

    useEffect(()=>{
        setValues({
            id: product.id,
            image: product.image,
            title: product.title,
            description: product.description,
            price: product.price,
            rating: {
                rate: product.rating.rate,
                count: product.rating.count
            }
        })
    },[product])

    const onHandleChange = (event) => {

        if (event.target.name === 'rate' || event.target.name === 'count') {
            setValues({
                ...values,
                rating: {
                    ...values.rating,
                    [event.target.name]: event.target.value
                }
            });
            return;
        }

        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const dispatch = useDispatch();

    const cartData = useSelector(state => state.cart);

    const onAddToCart = (product) => {

        dispatch(getCartData());
        dispatch(addToCart(product));
        success('Product Added to Cart!')
    }

    const onDeleteProduct = async (id) => {
        if (window.confirm('Do you want to delete this product?')) {
            const response = await deleteProduct(id);

            dispatch(getProductsData());
            success('Product deleted successfully!')
        }
    }

    const onSave = async (id) => {
        const response = await updateProduct(id, values);
        dispatch(getProductsData());
        success('Product updated successfully!');
        setEdit(false);
    }

    return (
        <>
            {edit ? (<div className='card'>
                <div className="product__image">
                    <img src={image} alt={title} />
                </div>
                <div className="product__info">
                    <div className="info__left">
                        <div className="info__text">
                            <span className='product__title'>   <input
                                value={values.title}
                                type="text"
                                name='title'
                                placeholder='Title' className='inputs__edit'
                                onChange={(event) => onHandleChange(event)}
                            />
                            </span>
                            <span className='product__price'><input
                                value={values.price} type="number" placeholder='Price' className='inputs__edit'
                                name="price"
                                onChange={(event) => onHandleChange(event)}
                            />
                            </span>
                        </div>

                        <div className="ratings__edit">
                            <span>
                                <input
                                    value={values.rating.rate}
                                    type="number" placeholder='Rate'
                                    name="rate"
                                    className='inputs__edit'
                                    onChange={(event) => onHandleChange(event)}
                                />
                            </span>
                            <span className='rating__count'><input value={values.rating.count} type="number" placeholder='Count'
                                name="count"
                                className='inputs__edit'
                                onChange={(event) => onHandleChange(event)}
                            />
                            </span>
                        </div>
                    </div>
                    <div className="info__right">
                        <span className="product__desc">
                            <textarea
                                placeholder='Description'
                                rows="5"
                                cols="30"
                                className='inputs__edit'
                                name="description"
                                value={values.description}
                                onChange={(event) => onHandleChange(event)}
                            >
                            </textarea>
                        </span>
                        <div className="actions">
                            <Button
                                startIcon={<CancelRoundedIcon />} variant="contained" color="error"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                startIcon={<SaveRoundedIcon />} variant="contained" color="warning"
                                onClick={() => onSave(product.id)}
                            >
                                Save
                            </Button>

                        </div>
                    </div>
                </div>
            </div>) :
                (<div className='card'>
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
                                    <Rating name="half-rating-read" defaultValue={rate? rate : 0} precision={0.5} readOnly />
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
                                    startIcon={<AddShoppingCartRoundedIcon />} variant="contained" color="success"
                                    onClick={() => onAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                                <EditIcon sx={styles.edit} onClick={() => setEdit(true)} />
                                <DeleteIcon
                                    sx={styles.delete}
                                    onClick={() => onDeleteProduct(product.id)}
                                />
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
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