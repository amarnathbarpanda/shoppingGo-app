import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

const CardItem = ({ product: { id, title, description, image, price, rating: { rate, count }, } }) => {
    return (
        <div className='card'>
            <div className="product__image">
                <img src={image} alt={title} />
            </div>
            <div className="product__info">
                <div className="info__left">
                    <div className="info__text">
                        <span className='product__title'>{title}</span>
                        <span className='product__price'>₹ {price}</span>
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
                        {description}
                    </span>
                    <div className="actions">
                        <Button startIcon={<AddShoppingCartRoundedIcon/>} variant="contained" color="success">Add to Cart</Button>
                        <EditIcon sx={styles.edit} />
                        <DeleteIcon sx={styles.delete} />
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