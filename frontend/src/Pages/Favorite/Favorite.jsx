import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import './Favorite.scss';
import preload2 from '/preload2.gif';

const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' 
);

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const { data, error } = await supabase
                  .from('favorites')
                  .select('*')
                  .order('created_at', { ascending: false })
                  // .limit(15);
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
                <h2 className="favorite__title">Избранное</h2>
                {loading ? (
                    <img src={preload2} alt="" />
                ) : error ? (
                    <p>Ошибка: {error}</p>
                ) : (
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
                                <BaseBtn BtnText="Купить" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Favorite;
