/* eslint-disable no-unused-vars */

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';
import yaPlus from '/yaPlus.webp';
import userImg from '/user.svg';
import emptyCart from '/empty_cart.webp';
import emptyCart2 from '/empty_cart_2.webp';
import preload2 from '/preload2.gif';

import '../../Pages/SuccessLogin/SuccessLogin.scss';
import './Orders.scss';

const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', // Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
);

const Orders = () => {
    const [user, setUser] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [userImage, setUserImage] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function getUserData() {
            const { user } = await supabase.auth.getUser();
            setUser(user || {});
            setIsLoggedIn(!!user);
        }
        getUserData();
    }, []);

    useEffect(() => {
        const getUserEmail = () => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (session) {
                    setUserEmail(session.user.email);
                    setUserImage(session.user.user_metadata.avatar_url);
                    setCurrentUserEmail(session.user.email);
                    setIsLoggedIn(true);
                } else {
                    setUserEmail('');
                    setUserImage('');
                    setCurrentUserEmail(null);
                    setIsLoggedIn(false);
                }
            });
        };
        getUserEmail();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (currentUserEmail) {
                    setIsLoading(true);
                    const { data: ordersData, error } = await supabase
                        .from('orders')
                        .select('product_name, product_img, order_key')
                        .eq('user_email', currentUserEmail);
                    if (error) {
                        throw new Error('Ошибка при загрузке заказов');
                    }
                    setOrders(ordersData);
                    setFetchError(null);
                }
            } catch (error) {
                setFetchError(error.message);
                setOrders([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [currentUserEmail]);

    async function signOutUser() {
        await supabase.auth.signOut();
    }

    return (
        <div>
            <section className="first-element success">
                <div className="container">
                    <div className="success__container orders">
                        {userEmail ? (
                            // <div className="info-success orders">
                            //     <div className="info-success__title">Вы вошли в свою учетную запись!</div>
                            //     <Link to={PATHS.HOME}>
                            //         <BaseBtn BtnText="На главную" />
                            //     </Link>
                            // </div>
                            <></>
                        ) : (
                            <div className="info-success orders">
                                <div className="info-success__title">Вы не вошли в систему</div>
                                <Link to={PATHS.LOGIN}>
                                    <BaseBtn BtnText="Войти" />
                                </Link>
                            </div>
                        )}
                        <div className="info-success order-success order-page">
                            <div className="info-success__title">Купленные вами товары</div>
                            <div className="info-success__order__wrapper" style={{ justifyContent: 'center' }}>
                                {isLoading ? (
                                    <img src={preload2} alt="Loading..." />
                                ) : fetchError ? (
                                    <div>{fetchError}</div>
                                ) : (
                                    <div className="info-success__order__wrapper">
                                        {orders.length === 0 ? (
                                            <div className='empty' >
                                                <img src={emptyCart2} alt="" />
                                                <span>Вы еще ничего не купили</span>
                                            </div>
                                        ) : (
                                            orders.map((order, index) => (
                                                <div key={index} className="info-success__order order-page">
                                                    <div className="info-success__order__img">
                                                        <img src={order.product_img || yaPlus} alt="" />
                                                    </div>
                                                    <div className="info-success__order__text">
                                                        <h3 className="info-success__order__text__title">{order.product_name}</h3>
                                                        <span className="info-success__order__text__key">
                                                            Ключ товара: <strong>{order.order_key}</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Orders;
