import React, { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Badge from '@mui/material/Badge';


import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartData } from '../actions';


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

  const dispatch = useDispatch();

  const [hamMenu, setHamMenu] = useState(false);

  useEffect(()=>{
    dispatch(getCartData());
  },[]);

  const cartCount = useSelector(state => state.noOfCartItems);

  return (
    <nav className='navbar'>
      <div className='logo'>ShoppingGo</div>
      <ul className='menu'>
        <li className='menu__item'>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className='menu__item'>
          <NavLink to="/add-product">Add Product</NavLink>
        </li>
      </ul>
      <div className='others'>
        <PersonOutlineOutlinedIcon titleAccess='David' sx={customStyles.userIcon} />
        <div className='cart__icon'>
          <Badge sx={customStyles.badgeStyle} className='badge' badgeContent={cartCount > 0 ? cartCount : 0} color="error">
            <Link to="/cart">
              <ShoppingCartOutlinedIcon sx={customStyles.cartIcon} />
            </Link>
          </Badge>
        </div>
      </div>
      <div id="hamburger__menu">
        <div id="ham__menu" className={hamMenu? 'icon': ''} onClick={()=> setHamMenu(!hamMenu)}>
          <div id="bar1" className="bar"></div>
          <div id="bar2" className="bar"></div>
          <div id="bar3" className="bar"></div>
        </div>
        <ul className={hamMenu ? 'ham__nav show' : 'ham__nav hide'} id="ham__nav">
          <li>
            <NavLink to='/' onClick={() => setHamMenu(!hamMenu)}>Home</NavLink>
          </li>
          <li>
            <NavLink to='/add-product' onClick={() => setHamMenu(!hamMenu)}>Add Product</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;