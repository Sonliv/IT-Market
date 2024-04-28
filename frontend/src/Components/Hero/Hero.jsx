import './Hero.scss'
import banner__1 from '/banner__1.webp'
import banner__3 from '/banner__3.webp'
import banner__5 from '/banner__5.webp'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay} from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <Swiper className='banner-swiper'
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    navigation={true} modules={[Navigation, Autoplay]}
                    pagination={{
                        clickable: true,
                      }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    >
                    <SwiperSlide><div className="hero-banner-wrapper"><img className='hero-banner' src={banner__1} alt="" /></div></SwiperSlide>
                    <SwiperSlide><img className='hero-banner' src={banner__5} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='hero-banner' src={banner__3} alt="" /></SwiperSlide>
                 </Swiper>
            </div>
        </section>
    );
}
 
export default Hero;



