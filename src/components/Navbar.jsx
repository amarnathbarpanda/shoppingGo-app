import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Badge from '@mui/material/Badge';


import './Navbar.css';
import { Link } from 'react-router-dom';

const customStyles = {
  badgeStyle: {
    "& .MuiBadge-badge": {
      fontSize: '1.3rem'
    }
  },
  userIcon: {
    fontSize: '2.5rem'
  },
  cartIcon: {
    fontSize: '2.3rem',
  },
}

const Navbar = () => {

  return (
    <nav className='navbar'>
      <div className='logo'>ShoppingGo</div>
      <ul className='menu'>
        <li className='menu__item'>
          <Link to="/" >Home</Link>
        </li>
        <li className='menu__item'>
          <Link to="/add-product" className='menu__item'>Add Product</Link>
        </li>
      </ul>
      <div className='others'>
        <PersonOutlineOutlinedIcon titleAccess='David' sx={customStyles.userIcon} />
        <div className='cart'>
            <Badge sx={customStyles.badgeStyle} className='badge' badgeContent={3} color="error">
          <Link to="/cart">
            <ShoppingCartOutlinedIcon sx={customStyles.cartIcon} />
          </Link>
          </Badge>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;