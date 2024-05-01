/* eslint-disable react/prop-types */
import './Categories.scss'
import watch from '/watch.webp'
import play from '/play.webp'
import read from '/read.webp'
import listen from '/listen.webp'
import { PATHS } from '../../../router'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import {  Autoplay} from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom'



function CategoryCard(props){
    return(
      <Link to={props.url} >
              <div className="categories-item">
                <h4 className="categories-item-title">{props.title}</h4>
                <p className="categories-item-desc">{props.desc}</p>
                <img className='categories-item-img' src={props.categoryImg} alt="" />
             </div>
      </Link>
    )
}

const Categories = () => {
    return (
        <section className="categories">
            <div className="container">
                <Swiper className='categories-swiper'
                    spaceBetween={20}
                    slidesPerView={1.1}
                    pagination={{
                        clickable: true,
                      }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      breakpoints={{
                        350: {
                            slidesPerView: 1.16,
                          },
                          400: {
                            slidesPerView: 1.3,
                          },
                          450: {
                            slidesPerView: 1.5,
                          },
                          500: {
                            slidesPerView: 1.7,
                          },
                          550: {
                            slidesPerView: 1.9,
                          },
                          670: {
                            slidesPerView: 2.2,
                          },
                          750: {
                            slidesPerView: 2.5,
                          },
                          900: {
                            slidesPerView: 2.7,
                          },
                          960: {
                            slidesPerView: 3.3,
                          },
                          1060: {
                            slidesPerView: 3.5,
                          },
                          1160: {
                            slidesPerView: 3.5,
                          },
                          1230: {
                            slidesPerView: 4,
                          },
                      }}
                    >
                    <SwiperSlide  className='categories-slide'>
                      <CategoryCard 
                        title="Что посмотреть?" 
                        desc="Лучшие подписки по выгодным ценам" 
                        categoryImg={watch}
                        url={PATHS.FILM}
                    /></SwiperSlide>
                    <SwiperSlide  className='categories-slide'>
                      <CategoryCard 
                      title="Во что поиграть?" 
                      desc="Ключи, коды активации для ваших игр" 
                      categoryImg={play} 
                      url={PATHS.GAME}
                      />
                    </SwiperSlide>
                    <SwiperSlide  className='categories-slide'>
                      <CategoryCard 
                      title="Что почитать?" 
                      desc="Электронные книги, которые любят наши читатели" 
                      categoryImg={read} 
                      url={PATHS.DIGITAL}
                      />
                    </SwiperSlide>
                    <SwiperSlide  className='categories-slide'>
                      <CategoryCard 
                      title="Что Послушать?" 
                      desc="Топ подборка от наших слушателей аудиокниг" 
                      categoryImg={listen} 
                      url={PATHS.AUDIO}
                      />
                    </SwiperSlide>
                 </Swiper>
            </div>
        </section>
    );
}
 
export default Categories;