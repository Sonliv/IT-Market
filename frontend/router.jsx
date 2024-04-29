import { Routes, Route } from 'react-router-dom';
import MainPage from './src/Pages/Home';
import LoginPage from './src/Pages/LoginPage/LoginPage';
import SuccessLogin from './src/Pages/SuccessLogin/SuccessLogin';
import AddProduct from './src/Pages/AddProduct/AddProduct';
import Orders from './src/Pages/Orders/Orders';
import Favorite from './src/Pages/Favorite/Favorite';


export const PATHS = {
    HOME: '/',
    LOGIN: '/LoginPage',
    SUCCESS: '/SuccessLogin',
    ADDPRODUCT: '/AddProduct',
    ORDERS: '/Order',
    FAVORITE: '/Favorite'
}

export const router = () =>(
    <Routes>
        <Route path={PATHS.HOME} element={<MainPage/>}/>
        <Route path={PATHS.LOGIN} element={<LoginPage/>}/>
        <Route path={PATHS.SUCCESS} element={<SuccessLogin/>}/>
        <Route path={PATHS.ADDPRODUCT} element={<AddProduct/>}/>
        <Route path={PATHS.ORDERS} element={<Orders/>}/>
        <Route path={PATHS.FAVORITE} element={<Favorite/>}/>
    </Routes>
)