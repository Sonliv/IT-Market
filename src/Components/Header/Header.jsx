import Logo from '../Base/Logo/Logo';
import searchImg from '/search.svg';
import cartImg from '/cart.svg'
import userImg from '/user.svg'
import favoriteImg from '/favorite.svg'
import { createClient } from '@supabase/supabase-js';
import './Header.scss';

// import { Routes, Route, Link } from 'react-router-dom';
// import CartPage from '../../Pages/CartPage';
// import CartPage from '../../Pages/CartPage/CartPage';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';
import { useState, useEffect } from 'react';

const Header = () => {
    const [userName, setUserName] = useState([])

    const supabase = createClient(
        'https://poprpfzqyzbmsbhtvvjw.supabase.co', // Supabase URL
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
    );

    useEffect(() => {
        const getUserName = () => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (session) {
                    setUserName(session.user.email);
                } else {
                    setUserName("Имя");
                }
            });
        };
        getUserName();
    }, []);


    return (
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <div className="header-logo-wrapper">
                        <Logo/>
                        <Link to= {PATHS.ADDPRODUCT} className="header-catalog" >
                            <span>Добавить товар</span>
                        </Link>
                    </div>
                    <form className='header-search' action="#">
                        <input className='header-search-input' placeholder='Яндекс плюс' type="text" />
                        <button className="header-search-button"><img src={searchImg} alt="" /></button>
                    </form>
                    <div className="header-buttons">
                        <Link to={PATHS.ADDPRODUCT}className="header-buttons-item" >
                             <img src={favoriteImg} alt="" />
                            <span>Избранное</span>
                        </Link>
                        <Link to="/CartPage"  className="header-buttons-item">
                        {/* onClick={toggleMenu} */}
                            <img src={cartImg} alt="" />
                            <span>Корзина</span>
                        </Link>
                        <Link to={PATHS.LOGIN} className="header-buttons-item header-buttons-item__user">
                            <img src={userImg} alt="" />
                            {userName && <span>{userName}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
 
{/* <Routes>
<Route path="/CartPage" element={<CartPage/>} />
</Routes> */}

export default Header;