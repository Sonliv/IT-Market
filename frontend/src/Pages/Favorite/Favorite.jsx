import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import './Favorite.scss';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';


const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' 
  );

  const Favorite = ({ currentUserEmail }) => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (currentUserEmail) {
            const { data, error } = await supabase
              .from('favorites')
              .select()
              .eq('user_email', currentUserEmail);
            if (error) {
              throw new Error('Ошибка при загрузке избранных');
            }
            setFavorites(data || []);
          }
        } catch (error) {
          console.error('Ошибка:', error.message);
        }
      };
  
      fetchData();
    }, [currentUserEmail]);
  
    return (
      <section className="favorite first-element">
        <div className="container">
          <h2 className="favorite__title">Избранное</h2>
          <div className="favorite__wrapper">
            {favorites.map((item, index) => (
              <div key={index} className="favorite__item">
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
        </div>
      </section>
    );
  };
  
  export default Favorite;