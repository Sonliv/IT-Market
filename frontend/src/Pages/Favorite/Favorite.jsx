import { useEffect, useState } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import './Favorite.scss';
import preload2 from '/preload2.gif';
import GetEmailAvatar from '../../GetEmailAvatar';
import { supabase } from '../../supabase';
import { PATHS } from '../../../router';
import Empty from '../../Components/Empty/Empty';
import CreatePayment from '../../CreatePayment';

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('favorites')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (error) {
                    throw new Error('Ошибка при загрузке избранных');
                }
                // Grouping the data by favorites_id to ensure uniqueness
                const groupedData = data.reduce((acc, item) => {
                    if (!acc[item.favorites_id]) {
                        acc[item.favorites_id] = item;
                    }
                    return acc;
                }, {});
                // Converting the grouped object back to an array
                const uniqueFavorites = Object.values(groupedData);
                setFavorites(uniqueFavorites);
            } catch (error) {
                console.error('Ошибка:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const { createPayment } = CreatePayment();

    const handleBuyClick = async (favoritesId) => {
        try {
            // Получаем данные о товаре из таблицы productFilm по favorites_id
            const { data, error } = await supabase
                .from('productFilm')
                .select('*')
                .eq('id', favoritesId)
                .single();

            if (error) {
                throw new Error('Ошибка при получении данных о товаре');
            }

            // Создаем платеж с полученными данными о товаре
            createPayment(data);
        } catch (error) {
            console.error('Ошибка при создании платежа:', error.message);
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
                        {error ? (
                            <p>Ошибка: {error}</p>
                        ) : favorites.length > 0 ? (
                            <>
                                <h2 className="favorite__title">Избранное</h2>
                                <div className="favorite__wrapper">
                                    {favorites.map((item) => (
                                        <div key={item.id} className="favorite__item">
                                            <div className="favorite__item__img__wrapper">
                                                <img
                                                    src={item.favorites_img}
                                                    alt=""
                                                    className="favorite__item__img"
                                                />
                                            </div>
                                            <h3 className="favorite__item__title">{item.favorites_title}</h3>
                                            <p className="favorite__item__desc">{item.favorites_desc}</p>
                                            <span className="favorite__item__cost">{item.favorites_cost}</span>
                                            <div onClick={() => handleBuyClick(item.favorites_id)}>
                                                <BaseBtn BtnText="Купить" />
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
        </section>
    );
};

export default Favorite;
