

import './CartPage.scss'

import favorite from '/favorite.svg'
import garbage from '/garbage.png'
import book from '/book.webp'
import BaseBtn from '../Components/Base/BaseBtn/BaseBtn'


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
                        <BaseBtn BtnText="Оформить заказ" />
                     </div>
                </div>
            </div>
        </section>
    );
}

export default CartPage;