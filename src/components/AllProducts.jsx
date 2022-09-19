import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import './AllProducts.css';
import CardItem from './CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal, getProductsData } from '../actions';
import CircularProgress from '@mui/material/CircularProgress';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    const productSelector = useSelector(state=>state.productData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsData());
        dispatch(getCartTotal());
    }, []);
    
    useEffect(()=>{
        setProducts(productSelector);
    }, [productSelector]);

    
    const sortData = (a, b) => {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    const sortDataById = (a, b) => {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    const onSort = () =>{
        if(!isSorted){
            const sortedProducts = products.sort(sortData);
            setProducts(sortedProducts);
        }else{
            const sortedProducts = products.sort(sortDataById);
            setProducts(sortedProducts);
        }

        setIsSorted(!isSorted);
    }

    return (
        <div className="all__products">
            <div className='sort__tag'>
                <span onClick={()=> onSort()}>
                    Sort by price
                    {isSorted && <CancelIcon sx={{color: "gray", fontSize: '2rem'}}/>}
                </span>
            </div>
            <div className="card__container">
                { products.length > 0 ? (products?.map((product, index)=>(
                    <CardItem key={index} product={product}/>
                ))): (<CircularProgress sx={{color: 'white'}}/>)}
            </div>
        </div>
    )
}

export default AllProducts;