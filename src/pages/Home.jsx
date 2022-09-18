import React from 'react'
import AllProducts from '../components/AllProducts';

import './Home.css';
const Home = () => {
  
  return (
    <div className="home">
      <div className="home__container">
        <section className="left">
          <h2>Welcome to ShoppingGo!</h2>
          <h3>The All In One Store - Find your products at a really affordable price.</h3>
        </section>
        <section className="right">
          <img src="/shop.png" alt="" width="250px" height="250px" />
        </section>
      </div>
      <AllProducts />
    </div>

  )
}

export default Home;