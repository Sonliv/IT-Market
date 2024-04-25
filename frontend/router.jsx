import { Routes, Route } from 'react-router-dom';
import MainPage from './src/Pages/Home';
import LoginPage from './src/Pages/LoginPage/LoginPage';
import SuccessLogin from './src/Pages/SuccessLogin/SuccessLogin';
import AddProduct from './src/Pages/AddProduct/AddProduct';


export const PATHS = {
    HOME: '/',
    LOGIN: '/LoginPage',
    SUCCESS: '/SuccessLogin',
    ADDPRODUCT: '/AddProduct'
}

export const router = () =>(
    <Routes>
        <Route path={PATHS.HOME} element={<MainPage/>}/>
        <Route path={PATHS.LOGIN} element={<LoginPage/>}/>
        <Route path={PATHS.SUCCESS} element={<SuccessLogin/>}/>
        <Route path={PATHS.ADDPRODUCT} element={<AddProduct/>}/>
    </Routes>
)