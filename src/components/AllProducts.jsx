import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import './AllProducts.css';
import CardItem from './CardItem';

const AllProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://my-json-server.typicode.com/amarnathbarpanda/ShoppingGo/products')
        .then(res =>res.json())
        .then(data => setProducts(data));
    }, [products])
    

    return (
        <div className="all__products">
            <div className='sort__tag'>
                <span>
                    Sort by price
                    <CancelIcon />
                </span>
            </div>
            <div className="card__container">
                {products?.map((product, index)=>(
                    <CardItem key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default AllProducts;