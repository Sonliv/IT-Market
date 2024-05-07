import { useEffect, useState } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import '../Favorite/Favorite.scss';
import preload2 from '/preload2.gif';
import GetEmailAvatar from '../../GetEmailAvatar';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';
import EmptyFavourites from '/empty__favourites2.webp';
import Empty from '../../Components/Empty/Empty';
import OrderModal from '../../Components/OrderModal/OrderModal';

const Orders = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [selectedOrderKey, setSelectedOrderKey] = useState(null); // Track selected order key
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const fetchData = async () => {
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
                    if (!acc[item.favorites_id]) {
                        acc[item.favorites_id] = item;
                    }
                    return acc;
                }, {});
                const uniqueFavorites = Object.values(groupedData);
                setFavorites(uniqueFavorites);
            } catch (error) {
                console.error('Ошибка:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchData();
        }
    }, [userEmail]);

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
                {userEmail ? (
                    <div>
                        {loading ? (
                            <img src={preload2} alt="" />
                        ) : error ? (
                            <p>Ошибка: {error}</p>
                        ) : favorites.length > 0 ? (
                            <>
                                <h2 className="favorite__title">Ваши заказы</h2>
                                <div className="favorite__wrapper">
                                    {favorites.map((item) => (
                                        <div key={item.id} className="favorite__item">
                                            <div className="favorite__item__img__wrapper">
                                                <img
                                                    src={item.product_img}
                                                    alt=""
                                                    className="favorite__item__img"
                                                />
                                            </div>
                                            <h3 className="favorite__item__title">{item.product_name}</h3>
                                            <span className="favorite__item__cost">{item.total_price}</span>
                                            <p className="favorite__item__desc"><strong>Ключ:</strong> {item.order_key} ₽</p>
                                            <div onClick={() => openModal(item.order_key)} > 
                                                <BaseBtn BtnText="Подробнее"  />
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
                        {isModalOpen && <OrderModal onClose={closeModal} orderKey={selectedOrderKey}/>}
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
