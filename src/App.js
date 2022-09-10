import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar, Home } from './components';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />   
        </Routes>
        <Routes>
          <Route path='/add-product' exact element={<AddProduct/>} />   
        </Routes>
        <Routes>
          <Route path='/cart' exact element={<Cart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
