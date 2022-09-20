import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import './App.css';
import { Navbar, Home } from './components';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer style={{fontSize: '1.6rem'}} transition={Slide} />
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />   
        </Routes>
        <Routes>
          <Route path='/add-product' exact element={<AddProduct/>} />   
        </Routes>
        <Routes>
          <Route path='/cart' exact element={<Cart/>} />
          <Route path='/product-details/:id' exact element={<ProductDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
