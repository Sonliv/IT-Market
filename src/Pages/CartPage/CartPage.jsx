

import './CartPage.scss'

import favorite from '/favorite.svg'
import garbage from '/garbage.png'
import book from '/book.webp'
// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'

import {Link} from 'react-router-dom'




function CartItem(){
    return(
    <div className="cart-item">
        <img src={book} alt="" />
        <div className="cart-item-info">
            <h3 className="cart-item-info-title">Триумфальная арка</h3>
            <span className="cart-item-info-desc">Эрих Мария Ремарк</span>
        </div>
        <div className="cart-item-buttons">
            <button><img src={favorite} alt="" /></button>
            <button><img src={garbage} alt="" /></button>
        </div>
    </div>
    )
}

const CartPage = () => {
    

    return (
        <section className="cart-page">
            <div className="container">
                <h2 className="cart-title">Корзина</h2>
                <div className="cart-container">
                     <div className="cart-wrapper">
                         <CartItem/>
                         <CartItem/>
                         <CartItem/>
                     </div>
                     <div className="cart-total">
                        <div className="cart-total-info">
                            <span className="cart-total-info-text">Итого:</span>
                            <span className="cart-total-info-sum">624 ₽</span>
                        </div>
                        <Link to="/loginPage">
                          <BaseBtn BtnText="Оформить заказ" />
                        </Link>
                     </div>
                </div>
            </div>
        </section>
    );
}

export default CartPage;


// import './CartPage.scss'

// import favorite from '/favorite.svg'
// import garbage from '/garbage.png'
// import book from '/book.webp'
// // import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'
// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'

// import { Link } from 'react-router-dom'
// import { createClient } from '@supabase/supabase-js';
// import { useEffect, useState } from 'react'

// const supabase = createClient(
//     'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
// );

// function CartItem() {
//     return (
//         <div className="cart-item">
//             <img src={book} alt="" />
//             <div className="cart-item-info">
//                 <h3 className="cart-item-info-title">Триумфальная арка</h3>
//                 <span className="cart-item-info-desc">Эрих Мария Ремарк</span>
//             </div>
//             <div className="cart-item-buttons">
//                 <button><img src={favorite} alt="" /></button>
//                 <button><img src={garbage} alt="" /></button>
//             </div>
//         </div>
//     )
// }

// const CartPage = () => {
//     // Стейт для хранения данных и ошибок
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Асинхронная функция, которая получает данные из Supabase
//         const fetchData = async () => {
//             try {
//                 const { data, error } = await supabase
//                     .from('productFilm')
//                     .select();

//                 if (error) {
//                     setError(error.message);
//                 } else {
//                     setData(data);
//                 }
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         // Вызов асинхронной функции при монтировании компонента
//         fetchData();

//         // Здесь можно возвращать функцию очистки, если это необходимо
//         // Например, если вы хотите отписаться от каких-то подписок или очистить таймеры
//         return () => {
//             // Логика очистки, если нужно
//         };
//     }, []); // Пустой массив

//     return (
//         <section className="cart-page">
//             <div className="container">
//                 <h2 className="cart-title">Корзина</h2>
//                 <div className="cart-container">
//                     <div className="cart-wrapper">
//                         <CartItem />
//                         <CartItem />
//                         <CartItem />
//                     </div>
//                     <div className="cart-total">
//                         <div className="cart-total-info">
//                             <span className="cart-total-info-text">Итого:</span>
//                             <span className="cart-total-info-sum">624 ₽</span>
//                         </div>
//                         <Link to="/loginPage">
//                             <BaseBtn BtnText="Оформить заказ" />
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//             <section className="test">
//                 <div className="container">
//                     <div>
//                         {/* Вывод данных */}
//                         {data && (
//                             <div>
//                                 <h2>Данные из Supabase:</h2>
//                                 <pre>{JSON.stringify(data, null, 2)}</pre>
//                             </div>
//                         )}

//                         {/* Вывод ошибки, если она есть */}
//                         {error && (
//                             <div>
//                                 <h2>Ошибка:</h2>
//                                 <p>{error}</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </section>
//     );
// }

// export default CartPage;