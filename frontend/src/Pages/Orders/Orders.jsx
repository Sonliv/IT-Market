import { useEffect, useState } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import '../Favorite/Favorite.scss';
import preload2 from '/preload2.gif';
import GetEmailAvatar from '../../GetEmailAvatar';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';
import EmptyFavourites from '/empty__favourites2.webp'
import Empty from '../../Components/Empty/Empty';


const Orders = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('orders')
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
                        ) : (
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
                                        <BaseBtn BtnText="Подробнее" />
                                    </div>
                                ))}
                            </div>
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
        </section>
    );
};

export default Orders;
