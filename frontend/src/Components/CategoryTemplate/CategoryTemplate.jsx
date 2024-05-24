import preload2 from '/preload2.gif';
import { useEffect, useState } from 'react';
import BaseBtn from '../Base/BaseBtn/BaseBtn';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import CreatePayment from '../../CreatePayment';

const CategoryTemplate = (props) => {
    const [productFilm, setProductFilm] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { createPayment } = CreatePayment();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('productFilm')
                    .select('*')
                    .eq('product_film_category', props.CategoryPage) // Фильтруем только по категории 
                    .order('created_at', { ascending: false });
                if (error) {
                    throw new Error('Ошибка при загрузке избранных');
                }
                // Grouping the data by favorites_id to ensure uniqueness
                const groupedData = data.reduce((acc, item) => {
                    if (!acc[item.id]) {
                        acc[item.id] = item;
                    }
                    return acc;
                }, {});
                // Converting the grouped object back to an array
                const uniqueFavorites = Object.values(groupedData);
                setProductFilm(uniqueFavorites);
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
                <h2 className="favorite__title">{props.CategoryTitle}</h2>
                {loading ? (
                    <img src={preload2} alt="" />
                ) : error ? (
                    <p>Ошибка: {error}</p>
                ) : (
                    <div className="favorite__wrapper">
                        {productFilm.map((item) => (
                            <div key={item.id} className="favorite__item">
                                <Link to={`/product/${item.id}`} key={item.id}>
                                    <div className="favorite__item__img__wrapper">
                                        <img
                                            src={item.productImage}
                                            alt=""
                                            className="favorite__item__img"
                                        />
                                    </div>
                                    <h3 className="favorite__item__title">{item.productFilmTitle}</h3>
                                    <p className="favorite__item__desc">{item.product_film_desc}</p>
                                    <span className="favorite__item__cost">{item.product_film_cost}</span>
                                </Link>
                                    <div onClick={() => createPayment({ ...item, product_film_key: item.product_film_key })}>
                                         <BaseBtn BtnText="Купить" />
                                    </div>
                                </div>
                            // <div key={item.id} className="favorite__item">
                            //     <div className="favorite__item__img__wrapper">
                            //         <img
                            //             src={item.productImage}
                            //             alt=""
                            //             className="favorite__item__img"
                            //         />
                            //     </div>
                            //     <h3 className="favorite__item__title">{item.productFilmTitle}</h3>
                            //     <p className="favorite__item__desc">{item.product_film_desc}</p>
                            //     <span className="favorite__item__cost">{item.product_film_cost}</span>
                            //     <BaseBtn BtnText="Купить" />
                            // </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default CategoryTemplate;
