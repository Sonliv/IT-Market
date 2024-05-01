import preload2 from '/preload2.gif';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import BaseBtn from '../Base/BaseBtn/BaseBtn';

const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' 
);

const CategoryTemplate = (props) => {
    const [productFilm, setProductFilm] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('productFilm')
                    .select('*')
                    .eq('product_film_category', props.CategoryPage) // Фильтруем только по категории "Кино"
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
                                <BaseBtn BtnText="Купить" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default CategoryTemplate;
