import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import preload2 from '/preload2.gif'

import { useState, useEffect } from 'react'

const ProductDigitalBook = ({ProductNavButtons, supabase}) => {
    let swiperInstance;
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки данных
    const [productFilm, setProductFilm] = useState(null);
  
    useEffect(() => {
        const fetchProductFilm = async () => {
            const { data, error } = await supabase
              .from('productFilm')
              .select('*')
              .eq('product_film_category', 'Электронные книги')
  
            if (error) {
                setFetchError('Ошибка, не получилось загрузить товары =(');
                setProductFilm(null);
                console.log(error);
            }
  
            if (data) {
                setProductFilm(data);
                setFetchError(null);
                setIsLoading(false); // Устанавливаем isLoading в false после загрузки данных
            }
        };
  
        fetchProductFilm();
    }, []);

    return ( 
        <>
            <div className="product-nav">
                <h2 className="product-nav-title">Электронные книги</h2>
                <ProductNavButtons buttonClassLeft="button-prev-4" buttonClassRight="button-next-4" />
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
                            prevEl: '.button-prev-4',
                            nextEl: '.button-next-4',
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
                                    <button className="product-item-btn">В корзину</button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </>
     );
}
 
export default ProductDigitalBook;