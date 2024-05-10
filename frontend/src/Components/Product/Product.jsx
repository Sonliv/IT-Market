/* eslint-disable react/prop-types */
import './Product.scss'
import rightArrow from '/arrow-right.svg'
import leftArrow from '/arrow-left.svg'
import ProductCinema from './Product-cinema/Product-cinema';
import ProductGame from './Product-game/Product-game'
import ProductAudioBook from './Product-audio-book/Product-audio-book'
import ProductDigitalBook from './Product-digital-book/Product-digital-book'
import ProductNew from './Product-new/Product-new'

// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
// );

import { supabase } from '../../supabase';


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
    return (
        <section className="product">
            <div className="container">
              <ProductNew supabase={supabase} ProductNavButtons={ProductNavButtons} />
              <ProductCinema supabase={supabase} ProductNavButtons={ProductNavButtons}/>
              <ProductGame supabase={supabase} ProductNavButtons={ProductNavButtons}/>
              <ProductAudioBook supabase={supabase} ProductNavButtons={ProductNavButtons}/>
              <ProductDigitalBook supabase={supabase} ProductNavButtons={ProductNavButtons}/>
            </div>
        </section>
    );
}
 
export default Product;