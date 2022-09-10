import React from 'react';


import './AllProducts.css';
import {data} from '../utils/data';
import CardItem from './CardItem';

const AllProducts = () => {
    return (
        <div className="all__products">
            <div className='sort__tag'><span>Sort by price</span></div>
            <div className="card__container">
                {data.map((product, index)=>(
                    <CardItem key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default AllProducts;