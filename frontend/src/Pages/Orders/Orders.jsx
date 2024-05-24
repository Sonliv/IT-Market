import { useState, useEffect } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import '../Favorite/Favorite.scss';
import GetEmailAvatar from '../../GetEmailAvatar';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';
// import EmptyFavourites from '/empty__favourites2.webp';
import Empty from '../../Components/Empty/Empty';
import OrderModal from '../../Components/OrderModal/OrderModal';
import preload2 from '/preload2.gif';
import './Orders.scss';


const Orders = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [selectedOrderKey, setSelectedOrderKey] = useState(null); // Track selected order key
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        fetchData();
    }, [userEmail]); // Вызов fetchData только при изменении userEmail

    const fetchData = async () => {
        if (!userEmail) {
            setLoading(false); // Stop loading if user is not authenticated
            return; // Проверка на наличие userEmail
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_email', userEmail)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error('Ошибка при загрузке заказов');
            }
            const groupedData = data.reduce((acc, item) => {
                if (!acc[item.product_id]) {
                    acc[item.product_id] = [];
                }
                acc[item.product_id].push(item);
                return acc;
            }, {});
            const uniqueFavorites = Object.values(groupedData).flat();
            setFavorites(uniqueFavorites);
        } catch (error) {
            console.error('Ошибка:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (orderKey) => {
        setSelectedOrderKey(orderKey);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="favorite first-element">
            <div className="container">
                <GetEmailAvatar setUserEmail={setUserEmail} />
                {loading ? (
                    <div className="preload-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img src={preload2} alt="" className="preload-img" />
                    </div>
                ) : userEmail ? (
                    <div>
                        {error ? (
                            <p>Ошибка: {error}</p>
                        ) : favorites.length > 0 ? (
                            <>
                                <h2 className="favorite__title">Ваши заказы</h2>
                                <div className="favorite__wrapper">
                                    {favorites.map((item) => (
                                        <div key={item.id} className="favorite__item">
                                            {/* <div className="favorite__item__img__wrapper">
                                                <img
                                                    src={item.product_img}
                                                    alt=""
                                                    className="favorite__item__img"
                                                />
                                            </div>
                                            <h3 className="favorite__item__title">{item.product_name}</h3>
                                            <span className="favorite__item__cost">{item.total_price}</span>
                                            <p className="favorite__item__desc">Ключ: <strong>{item.order_key}</strong></p> */}
                                            <Link to={`/product/${item.product_id}`} className="product-item-link">
                                                <div className="favorite__item__img__wrapper">
                                                    <img
                                                        src={item.product_img}
                                                        alt=""
                                                        className="favorite__item__img"
                                                    />
                                                </div>
                                                <h3 className="favorite__item__title order__cost">{item.product_name}</h3>
                                                <span className="favorite__item__cost order__cost">{item.total_price} ₽</span>
                                                <p className="favorite__item__desc stroke__fix">Ключ: <strong>{item.order_key}</strong></p>
                                            </Link>
                                            <div onClick={() => openModal(item.order_key)} >
                                                <BaseBtn BtnText="Подробнее" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <Empty
                                url={PATHS.HOME}
                                desc="Вы ещё ничего не"
                                spanText="купили"
                                btnText="За покупками!"
                            />
                        )}
                        {/* Render modal if modal is open */}
                        {isModalOpen && <OrderModal onClose={closeModal} orderKey={selectedOrderKey} />}
                    </div>
                ) : (
                    <Empty
                        url={PATHS.LOGIN}
                        desc="Авторизуйтесь, чтобы увидеть"
                        spanText="купленные товары"
                        btnText="Авторизоваться"
                    />
                )}
            </div>
        </section>
    );
};

export default Orders;
