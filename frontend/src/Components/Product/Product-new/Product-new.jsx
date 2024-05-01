
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import preload2 from '/preload2.gif'
import Favorite from '/favorite.svg'
import axios from 'axios';


import { useState, useEffect } from 'react'

const ProductNew = ({ProductNavButtons, supabase}) => {
    const [, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки данных
    const [productFilm, setProductFilm] = useState(null);
    const [isAddingToFavorites, setIsAddingToFavorites] = useState(false); // Добавляем состояние для блокировки кнопки



    const addToFavorites = async (product) => {
      try {
          if (isAddingToFavorites) {
              return;
          }
  
          setIsAddingToFavorites(true);
  
          const { data: existingFavorites, error: existingError } = await supabase
              .from('favorites')
              .select()
              .eq('favorites_id', product.id)
              .eq('favorites_email', userEmail);
  
          if (existingError) {
              throw existingError;
          }
  
          if (existingFavorites.length > 0) {
              console.log('Товар уже добавлен в избранное');
              return;
          }
  
          await supabase
              .from('favorites')
              .insert({
                  favorites_id: product.id,
                  favorites_title: product.productFilmTitle,
                  favorites_cost: product.product_film_cost,
                  favorites_desc: product.product_film_desc,
                  favorites_img: product.productImage,
                  favorites_email: userEmail
              });
  
          console.log('Товар добавлен в избранное');
  
      } catch (error) {
          console.error('Ошибка добавления товара в избранное:', error.message);
      } finally {
          // Разблокируем кнопку после завершения операции с небольшой задержкой
          setTimeout(() => {
              setIsAddingToFavorites(false);
          }, 1000); // Увеличиваем задержку до 1 секунды
      }
  };
  
  
    
  
    useEffect(() => {
        const fetchProductFilm = async () => {
            const { data, error } = await supabase
              .from('productFilm')
              .select('*')
  
            if (error) {
                setFetchError('Ошибка, не получилось загрузить товары =(');
                setProductFilm(null);
                console.log(error);
            }
  
            if (data) {
                setProductFilm(data.sort((a,b) => b.id - a.id))
                setFetchError(null);
                setIsLoading(false); // Устанавливаем isLoading в false после загрузки данных
            }
        };
  
        fetchProductFilm();
    }, []);


// оплата

const [userEmail, setUserEmail] = useState('');

useEffect(() => {
  // Ваш код для получения userEmail, например, из supabase
  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      setUserEmail(session.user.email);
    } else {
      setUserEmail("Имя");
    }
  });
}, []);



const createPayment = async (product) => {
  try {
      console.log('userEmail:', userEmail);
      const response = await axios.post('http://localhost:3001/create-payment', {
            productName: product.productFilmTitle,
            price: product.product_film_cost,
            userEmail: userEmail,
            product_id: product.id,
            product_img: product.productImage,
            product_film_key: product.product_film_key
      });

      if (!response.data.paymentUrl) {
          throw new Error('Не удалось получить URL для оплаты');
      }

      window.open(response.data.paymentUrl, '_blank');
  } catch (error) {
      console.error('Ошибка создания платежа:', error.message);
  }
};








  
    return ( 
        <>
            <div className="product-nav">
                <h2 className="product-nav-title">Новинки</h2>
                <ProductNavButtons buttonClassLeft="button-prev-5" buttonClassRight="button-next-5" />
            </div>
            <div className="product-wrapper">
                {/* Показываем прелоадер, если данные еще загружаются */}
                {isLoading && (
                    <div className="preload-container">
                        <img src={preload2} alt="Loading..." />
                    </div>
                )}
                {/* Показываем слайдер, когда данные загружены */}
                {!isLoading && productFilm && (
                    <Swiper
                        className="product-swiper"
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={false}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        navigation={{
                            prevEl: '.button-prev-5',
                            nextEl: '.button-next-5',
                        }}
                        modules={[Navigation, Autoplay]}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                          350: {
                            slidesPerView: 1.5,
                          },
                          400: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                          },
                          500: {
                            slidesPerView: 2.3,
                            slidesPerGroup: 1,
                          },
                          600: {
                            slidesPerView: 2.8,
                            slidesPerGroup: 2,
                          },
                          700: {
                            slidesPerView: 3.3,
                            slidesPerGroup: 2,
                          },
                          800: {
                            slidesPerView: 3.5,
                            slidesPerGroup: 2,
                          },
                          900: {
                            slidesPerView: 3.8,
                            slidesPerGroup: 2,
                          },
                          1000: {
                            slidesPerView: 4.3,
                            slidesPerGroup: 2,
                          },
                          1100: {
                            slidesPerView: 4.6,
                            slidesPerGroup: 2,
                          },
                          1200: {
                            slidesPerView: 5,
                            slidesPerGroup: 2,
                          },
                          1300: {
                            slidesPerView: 5.5,
                            slidesPerGroup: 3,
                          },
                        }}
                    >
                        {productFilm.map((film, index) => (
                            <SwiperSlide key={index}>
                                <div className="product-item">
                                    <div className="product-item-img-wrapper">
                                        <img className="product-item-img" src={film.productImage} alt="" />
                                    </div>
                                    <h3 className="product-item-title">{film.productFilmTitle}</h3>
                                    <p className="product-item-desc">{film.product_film_desc}</p>
                                    <p className="product-item-cost">{film.product_film_cost} Р</p>  
                                    {/* <button onClick={() => createPayment({ ...film, product_film_key: film.product_film_key })} className="product-item-btn">Купить</button> */}
                                    <div className='product-item-btn__wrapper' >
                                      <button onClick={() => createPayment({ ...film, product_film_key: film.product_film_key })} className="product-item-btn">Купить</button>
                                      <button onClick={() => addToFavorites(film)}><img src={Favorite} alt="" /></button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </>
     );
}
 
export default ProductNew;
