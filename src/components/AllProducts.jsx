import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import './AllProducts.css';
import CardItem from './CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsData } from '../actions';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    const productSelector = useSelector(state=>state.productData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsData());
    }, []);
    
    useEffect(()=>{
        setProducts(productSelector);
        console.log(products);
    }, [productSelector]);

    useEffect(()=>{ console.log("products updated");},[products, sortedData])
    
    const sortData = (a, b) => {
        if (a.price < b.price) {
            return -1;
        }
        if (a.price > b.price) {
            return 1;
        }
        return 0;
    }

    const onSort = () =>{
        if(!isSorted){
            const sortedProducts = products.sort(sortData);
            setSortedData(sortedProducts);
            setIsSorted(true);
        }
    }

    return (
        <div className="all__products">
            <div className='sort__tag'>
                <span onClick={()=> onSort()}>
                    Sort by price
                    {isSorted && <CancelIcon onClick={()=> setIsSorted(false)} sx={{color: "gray", fontSize: '2rem'}}/>}
                </span>
            </div>
            <div className="card__container">
                {!isSorted && products.length && products?.map((product, index)=>(
                    <CardItem key={index} product={product}/>
                ))}
                {isSorted && sortedData.length && sortedData?.map((product, index)=>(
                    <CardItem key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default AllProducts;