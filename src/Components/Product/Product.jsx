/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './Product.scss'
import yaPlus from '/yaPlus.jpg'
import book from '/book.webp'
import game from '/spider.jpg'
import rightArrow from '/arrow-right.svg'
import leftArrow from '/arrow-left.svg'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay} from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react'


const supabase = createClient(
  'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
);




function ProductItem(props){
    return(
        <div className="product-item">
            <div className="product-item-img-wrapper">
              <img className='product-item-img' src={props.cardImg} alt="" />
            </div>
            <h3 className="product-item-title">{props.cardTitle}</h3>
            <p className="product-item-desc">{props.cardDesc}</p>
            <p className="product-item-cost">{props.cardCost}</p>
            <button className="product-item-btn">В корзину</button>
        </div>
    );
}



function ProductNavButtons(props) {
  return (
      <div className='product-nav-buttons'>
          <button
              className={`${props.buttonClassLeft} product-nav-buttons-left`}
              onClick={() => props.swiperInstance && props.swiperInstance.slidePrev()}
          >
              <img src={leftArrow} alt="" />
          </button>
          <button
              className={`${props.buttonClassRight} product-nav-buttons-right`}
              onClick={() => props.swiperInstance && props.swiperInstance.slideNext()}
          >
              <img src={rightArrow} alt="" />
          </button>
      </div>
  );
}



const Product = () => {

    let swiperInstance;
    const [fetchError, setFetchError ] = useState(null)
    const [productFilm, setProductFilm] = useState(null)

    useEffect(() => {
      const fetchProductFilm = async () => {
        const { data, error } = await supabase
        .from('productFilm')
        .select()

        if (error) {
          setFetchError('Ошибка, не получилось загрузить товары =(')
          setProductFilm(null)
          console.log(error)
        }

        if(data){
          setProductFilm(data)
          setFetchError(null)
        }
      }

      fetchProductFilm()
    }, [])

    return (
        <section className="product">
            <div className="container">
                 <div className="product-nav">
                     <h2 className="product-nav-title">Фильмы</h2>
                     <ProductNavButtons buttonClassLeft="button-prev-1" buttonClassRight="button-next-1"/>
                </div>
                <div className="product-wrapper">
                {productFilm && (
                  <Swiper className='product-swiper'
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation={{
                      prevEl: ".button-prev-1",
                      nextEl: ".button-next-1"
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
                          <div className="product-item">
                            <div className="product-item-img-wrapper">
                              <img className='product-item-img' src={film.productImage} alt="" />
                            </div>
                            <h3 className="product-item-title">{film.productFilmTitle}</h3>
                            {/* <img src={film.productImage} alt="" /> */}
                            <p className="product-item-desc">{film.product_film_desc}</p>
                            <p className="product-item-cost">{film.product_film_cost} Р</p>
                            <button className="product-item-btn">В корзину</button>
                        </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                </div>
                    <div className="product-nav">
                        <h2 className="product-nav-title">Книги</h2>
                        <ProductNavButtons buttonClassLeft="button-prev-2" buttonClassRight="button-next-2"/>
                </div>
                <div className="product-wrapper">
                <Swiper className='product-swiper'
                    spaceBetween={20}
                    slidesPerView={1.5}
                    loop={true}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation={{
                        prevEl: ".button-prev-2",
                        nextEl: ".button-next-2"
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
                    {/* <SwiperSlide> <ProductItem cardImg={book} cardTitle="Триумфальная арка" cardDesc="Эрих Мария Ремарк" cardCost="220 ₽" /></SwiperSlide> */}
                 </Swiper>
                </div>
                <div className="product-nav">
                     <h2 className="product-nav-title">Игры</h2>
                     <ProductNavButtons buttonClassLeft="button-prev-3" buttonClassRight="button-next-3"/>
                </div>
                <div className="product-wrapper">
                <Swiper className='product-swiper'
                    spaceBetween={20}
                    slidesPerView={1.5}
                    loop={true}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation={{
                        prevEl: ".button-prev-3",
                        nextEl: ".button-next-3"
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
                    {/* <SwiperSlide> <ProductItem cardImg={game} cardTitle="Spider-man 2" cardDesc="Код активации от игры" cardCost="5200 ₽" /></SwiperSlide> */}
                    <SwiperSlide> <ProductItem cardImg={game} cardTitle="Spider-man 2" cardDesc="Код активации от игры" cardCost="5200 ₽" /></SwiperSlide>
                 </Swiper>
                </div>
            </div>
        </section>
    );
}
 
export default Product;