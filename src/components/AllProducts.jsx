import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import './AllProducts.css';
import CardItem from './CardItem';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/amarnathbarpanda/ShoppingGo/products')
        .then(res =>res.json())
        .then(data => setProducts(data));
    }, [products]);
    
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
                {!isSorted && products?.map((product, index)=>(
                    <CardItem key={index} product={product}/>
                ))}
                {isSorted && sortedData?.map((product, index)=>(
                    <CardItem key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default AllProducts;