import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CartPage from './Pages/CartPage/CartPage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import LoginPage from './Pages/LoginPage/LoginPage';
import SuccessLogin from './Pages/SuccessLogin/SuccessLogin';

function App() {
  return (
    <div className='wrapper' >
      <Header />
      <div className="content">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path = "/LoginPage" element = {<LoginPage/>} />
          <Route path = "/SuccessLogin" element = {<SuccessLogin/>} />
        </Routes>
      </div>
      <div className="footer-bottom">
        <Footer/>
      </div>
    </div>
  );
}


export default App;
