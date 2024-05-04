import { Routes, Route } from 'react-router-dom';
import MainPage from './src/Pages/Home';
import LoginPage from './src/Pages/LoginPage/LoginPage';
import SuccessLogin from './src/Pages/SuccessLogin/SuccessLogin';
import AddProduct from './src/Pages/AddProduct/AddProduct';
import Orders from './src/Pages/Orders/Orders';
import Favorite from './src/Pages/Favorite/Favorite';
import FilmCategory from './src/Pages/PagesCategorys/FilmCategory/FilmCategory';
import GameCategory from './src/Pages/PagesCategorys/GameCategory/GameCategory';
import AudioBookCategory from './src/Pages/PagesCategorys/AudioBookCategory/AudioBookCategory';
import DigitalBookCategory from './src/Pages/PagesCategorys/DigitalBookCategory/DigitalBookCategory ';
import ProductDetailsPage from './src/Pages/ProductDetailsPage/ProductDetailsPage';


export const PATHS = {
    HOME: '/',
    LOGIN: '/LoginPage',
    SUCCESS: '/SuccessLogin',
    ADDPRODUCT: '/AddProduct',
    ORDERS: '/Order',
    FAVORITE: '/Favorite',
    FILM: '/FilmCategory',
    GAME: '/GameCategory',
    AUDIO: '/AudioBookCategory',
    DIGITAL: '/DigitalBookCategory',
    DETAILS: '/product/:productId'
}

export const router = () =>(
    <Routes>
        <Route path={PATHS.HOME} element={<MainPage/>}/>
        <Route path={PATHS.LOGIN} element={<LoginPage/>}/>
        <Route path={PATHS.SUCCESS} element={<SuccessLogin/>}/>
        <Route path={PATHS.ADDPRODUCT} element={<AddProduct/>}/>
        <Route path={PATHS.ORDERS} element={<Orders/>}/>
        <Route path={PATHS.FAVORITE} element={<Favorite/>}/>
        <Route path={PATHS.FILM} element={<FilmCategory/>}/>
        <Route path={PATHS.GAME} element={<GameCategory/>}/>
        <Route path={PATHS.AUDIO} element={<AudioBookCategory/>}/>
        <Route path={PATHS.DIGITAL} element={<DigitalBookCategory/>}/>
        <Route path={PATHS.DETAILS} element={<ProductDetailsPage />} />
    </Routes>
)