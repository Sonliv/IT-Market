import React, { useEffect, useState } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import './Favorite.scss';
import GetEmailAvatar from '../../GetEmailAvatar';
import { supabase } from '../../supabase';
import { PATHS } from '../../../router';
import CreatePayment from '../../CreatePayment';
import { Link } from 'react-router-dom';
import HeartHover from '/brokenheart.webp';
import Heart from '/heart.webp';
import Empty from '../../Components/Empty/Empty';
import preload2 from '/preload2.gif';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const { createPayment } = CreatePayment();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);

    const openModal = (favoritesId) => {
        setSelectedFavoriteId(favoritesId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, [userEmail]);

    const fetchData = async () => {
        if (!userEmail) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('favorites')
                .select('*')
                .eq('favorites_email', userEmail)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error('Ошибка при загрузке избранных');
            }
            const uniqueFavorites = data.reduce((acc, item) => {
                if (!acc.find((fav) => fav.favorites_id === item.favorites_id)) {
                    acc.push(item);
                }
                return acc;
            }, []);
            setFavorites(uniqueFavorites);
        } catch (error) {
            console.error('Ошибка:', error.message);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuyClick = async (favoritesId) => {
        try {
            const { data, error } = await supabase
                .from('productFilm')
                .select('*')
                .eq('id', favoritesId)
                .single();

            if (error) {
                throw new Error('Ошибка при получении данных о товаре');
            }

            createPayment(data);
        } catch (error) {
            console.error('Ошибка при создании платежа:', error.message);
        }
    };

    const handleRemoveFromFavorites = async () => {
        try {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('favorites_id', selectedFavoriteId)
                .eq('favorites_email', userEmail);

            if (error) {
                throw new Error('Ошибка при удалении товара из избранного');
            }

            // Обновляем состояние, чтобы отобразить изменения на странице
            const updatedFavorites = favorites.filter((item) => item.favorites_id !== selectedFavoriteId);
            setFavorites(updatedFavorites);
            console.log('Товар успешно удалён из избранного');
        } catch (error) {
            console.error('Ошибка при удалении товара из избранного:', error.message);
        } finally {
            closeModal(); // Закрываем модальное окно после удаления
        }
    };

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("modal-overlay__favorite")) {
            closeModal();
        }
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
                        {error && error.message.includes("403") ? (
                            <Empty
                                url={PATHS.LOGIN}
                                desc="Авторизуйтесь, чтобы увидеть"
                                spanText="избранное"
                                btnText="Авторизоваться"
                            />
                        ) : (
                            <>
                                {error ? (
                                    <p>Ошибка: {error.message}</p>
                                ) : favorites.length > 0 ? (
                                    <>
                                        <h2 className="favorite__title">Избранное</h2>
                                        <div className="favorite__wrapper">
                                            {favorites.map((item) => (
                                                <div key={item.id} className="favorite__item">
                                                    <Link to={`/product/${item.favorites_id}`} className="product-item-link">
                                                        <div className="favorite__item__img__wrapper">
                                                            <img
                                                                src={item.favorites_img}
                                                                alt=""
                                                                className="favorite__item__img"
                                                            />
                                                        </div>
                                                        <h3 className="favorite__item__title">{item.favorites_title}</h3>
                                                        <p className="favorite__item__desc">{item.favorites_desc}</p>
                                                        <span className="favorite__item__cost">{item.favorites_cost} ₽</span>
                                                    </Link>
                                                    <div className='ofdf'>
                                                        <div onClick={() => handleBuyClick(item.favorites_id)}>
                                                            <BaseBtn BtnText="Купить" />
                                                        </div>
                                                        <img
                                                            src="https://img.icons8.com/?size=256&id=S4mt2cXyyOmK&format=png"
                                                            alt=""
                                                            onMouseOver={(e) => e.currentTarget.src = HeartHover}
                                                            onMouseOut={(e) => e.currentTarget.src = Heart}
                                                            onClick={() => openModal(item.favorites_id)} // Открываем модальное окно при клике на иконку сердца
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Empty
                                        url={PATHS.HOME}
                                        desc="Вы ещё ничего не добавили в"
                                        spanText="избранное"
                                        btnText="За покупками!"
                                    />
                                )}
                            </>
                        )}
                    </div>
                ) : (
                    <Empty
                        url={PATHS.LOGIN}
                        desc="Авторизуйтесь, чтобы увидеть"
                        spanText="избранное"
                        btnText="Авторизоваться"
                    />
                )}
            </div>
        {isModalOpen && (
            <div className="modal-overlay__favorite" onClick={handleOverlayClick}>
                <div className="modal__favorite">
                <span className="modal-close__favorite" onClick={closeModal}>×</span>
                        <h3>Вы уверены?</h3>
                        <p>Товар будет удален из избранного</p>
                        <div className="modal-buttons__favorite">
                            <div onClick={handleRemoveFromFavorites} className='red__button__favorite'>
                                <BaseBtn BtnText="Да" />
                            </div>
                            <div onClick={closeModal} className='close__btn__modal'>
                                <BaseBtn BtnText="Нет" />
                            </div>
                        </div>
                </div>
            </div>
        )}
        </section>
    );
};

export default Favorite;
