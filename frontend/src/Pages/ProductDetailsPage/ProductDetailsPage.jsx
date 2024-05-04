/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import Favorite from '/favorite.svg'; 
import profile from '/user.svg'
import './ProductDetailsPage.scss'
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import ArrowUrl from '/arrow_right_url.webp'
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import ShareImg from '/share_offer.webp'

const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
);

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [productFilm, setProductFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchProductFilm = async () => {
      try {
        const { data, error } = await supabase
          .from('productFilm')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) {
          throw error;
        }

        setProductFilm(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при получении информации о товаре:', error.message);
        setIsLoading(false);
      }
    };

    fetchProductFilm();
  }, [supabase, productId]);

  useEffect(() => {
    // Получение userEmail
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUserEmail(session.user.email);
      } else {
        setUserEmail("Имя");
      }
    });
  }, []);

  // Функция форматирования текста
const formatText = (text) => {
  if (!text) return null; // Добавляем проверку на null

  const paragraphs = text.split('\n\n'); // Разбиваем текст на абзацы по двойному переносу строки
  const formattedText = paragraphs.map((paragraph, index) => {
    // Обрабатываем абзацы
    if (paragraph.trim() === '') return null; // Пропускаем пустые строки
    return (
      <div key={index} className="text__format">
        {paragraph.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    );
  }).filter(item => item !== null); // Фильтруем пустые абзацы

  return formattedText;
};


  // условия

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productFilm) {
    return <div>Товар не найден</div>;
  }

  return (
    <>
        <section className='detail first-element'>
            <div className="container">
                <div className="detail__wrapper">
                    <div className="detail__short">
                        <div className="detail__short__img">
                            <img src={productFilm.productImage} alt="" />
                        </div>
                        <div className="detail__short__seller">
                            <img src="https://lh3.googleusercontent.com/a/ACg8ocLJtpwmuWbUNyXtmM1u2wKSHZP1cQl3rcTCR9a1UoOf7eJ1wNw=s96-c" 
                            alt="" className="detail__short__seller__img" />
                            <span className="detail__short__seller__mail">dmitrynairov@yandex.ru</span>
                        </div>
                        <div className="detail__payment payment_reveal">
                            <h3 className="detail__payment__cost">{productFilm.product_film_cost} ₽</h3>
                            <div className='detail__payment__buttons' >
                            <BaseBtn BtnText="Купить" />
                            <div className='detail__payment__button' > 
                            <BaseBtn BtnText="В избранное" />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="detail__info">
                        <nav className="detail__info__nav">
                          <ul className='detail__info__list' >
                            <li className="detail__info__nav__item">
                              <Link>Главная</Link>
                              <img src={ArrowUrl} alt="" />
                            </li>
                            <li className="detail__info__nav__item">
                              <Link>Каталог</Link>
                              <img src={ArrowUrl} alt="" />
                            </li>
                            <li className="detail__info__nav__item">
                             <Link>{productFilm.product_film_category}</Link>
                             <img src={ArrowUrl} alt="" />
                            </li>
                            <li className="detail__info__nav__item">
                              <Link>ID {productFilm.id}</Link> 
                            </li>
                          </ul>
                        </nav>
                        <h2 className="detail__info__title">{productFilm.productFilmTitle}</h2>
                        <div className="detail__info__desc">
                          <h3 className="detail__info__desc__title">Описание</h3>
                          {/* Используем функцию форматирования для отображения текста */}
                          <div className="detail__info__desc__text">{formatText(productFilm.product_film_desc)}</div>
                        </div>
                    </div>
                    <div className="detail__payment payment_hide">
                      <h3 className="detail__payment__cost">{productFilm.product_film_cost} ₽</h3>
                      <div className='detail__payment__buttons' >
                        <BaseBtn BtnText="Купить" />
                        <div className='detail__payment__button' > 
                         <BaseBtn BtnText="В избранное" />
                        </div>
                        <div className='detail__payment__button__share' >
                         <BaseBtn BtnText={<><span>Поделиться</span> <img src={ShareImg} alt="" /></>}/>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default ProductDetailsPage;
