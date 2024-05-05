import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Add this import
import profile from '/user.svg';
import './ProductDetailsPage.scss';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import ArrowUrl from '/arrow_right_url.webp';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import ShareImg from '/share_offer.webp';
import ShareModal from '../../Components/ShareModal/ShareModal';
import { PATHS } from '../../../router';
import UseFavorites from './UseFavorites'; // Исправлено на UseFavorites




const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
);


const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [productFilm, setProductFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  // const [isAddingToFavorites, setIsAddingToFavorites] = useState(false); // Добавляем состояние для блокировки кнопки
  const [isModalOpen, setIsModalOpen] = useState(false);


  
  const { addToFavorites } = UseFavorites(); // Исправлено на UseFavorites

  // Функция для открытия модального окна
const openModal = () => {
  setIsModalOpen(true);
};

// Функция для закрытия модального окна
const closeModal = () => {
  setIsModalOpen(false);
};

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

  // условия
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productFilm) {
    return <div>Товар не найден</div>;
  }

  // favorite

//   const addToFavorites = async (product) => {
//     try {
//         if (isAddingToFavorites) {
//             return;
//         }

//         setIsAddingToFavorites(true);

//         const { data: existingFavorites, error: existingError } = await supabase
//             .from('favorites')
//             .select()
//             .eq('favorites_id', product.id)
//             .eq('favorites_email', userEmail);

//         if (existingError) {
//             throw existingError;
//         }

//         if (existingFavorites.length > 0) {
//             console.log('Товар уже добавлен в избранное');
//             return;
//         }

//         await supabase
//             .from('favorites')
//             .insert({
//                 favorites_id: product.id,
//                 favorites_title: product.productFilmTitle,
//                 favorites_cost: product.product_film_cost,
//                 favorites_desc: product.product_film_desc,
//                 favorites_img: product.productImage,
//                 favorites_email: userEmail
//             });

//         console.log('Товар добавлен в избранное');

//     } catch (error) {
//         console.error('Ошибка добавления товара в избранное:', error.message);
//     } finally {
//         // Разблокируем кнопку после завершения операции с небольшой задержкой
//         setTimeout(() => {
//             setIsAddingToFavorites(false);
//         }, 1000); // Увеличиваем задержку до 1 секунды
//     }
// };

  // payment hide
function PaymentHide(){
  return(
    <div className="detail__payment payment_hide">
    <h3 className="detail__payment__cost">{productFilm.product_film_cost} ₽</h3>
    <div className='detail__payment__buttons' >
    <div onClick={() => createPayment({ ...productFilm, product_film_key: productFilm.product_film_key })} >
        <BaseBtn   BtnText="Купить" />
      </div>
      <div onClick={() => addToFavorites(productFilm)} className='detail__payment__button' > 
        <BaseBtn BtnText="В избранное" />
    </div>
    <div onClick={openModal} className='detail__payment__button__share'>
    <BaseBtn BtnText={<><span>Поделиться</span> <img src={ShareImg} alt="" /></>} />
        </div>
        {isModalOpen && (
  <ShareModal productName={productFilm.productFilmTitle} onClose={closeModal} productUrl={`http://localhost:3000/product/${productId}`} />
)}
    </div>
  </div>
  )
}

 // payment block
 function PaymentReveal(){
  return(
    <div className="detail__payment payment_reveal">
    <h3 className="detail__payment__cost">{productFilm.product_film_cost} ₽</h3>
    <div className='detail__payment__buttons' >
      <div  onClick={() => createPayment({ ...productFilm, product_film_key: productFilm.product_film_key })} >
        <BaseBtn   BtnText="Купить" />
      </div>
      <div onClick={() => addToFavorites(productFilm)} className='detail__payment__button' > 
    <BaseBtn BtnText="В избранное" />
  </div>
  <div onClick={openModal} className='detail__payment__button__share'>
    <BaseBtn BtnText={<><span>Поделиться</span> <img src={ShareImg} alt="" /></>} />
        </div>
        {isModalOpen && (
  <ShareModal productName={productFilm.productFilmTitle} onClose={closeModal} productUrl={`http://localhost:3000/product/${productId}`} />
)}
</div>
</div>
  )
}

  // function urlCategory(){
  //   let urlCategory = "2"
  //   if (productFilm.product_film_category == "Кино"){
  //     urlCategory = "FilmCategory"
  //   }
  // }

  function urlCategory() {
    let urlCategory = "GameCategory"; 
    console.log("Product Film Category:", productFilm.product_film_category);
    
    const category = productFilm.product_film_category.toLowerCase(); // Приводим к нижнему регистру для сравнения
    
    if (category === "кино") {
      urlCategory = "FilmCategory";
    }
    if (category === "игры"){
      urlCategory = "GameCategory";
    }
    if (category === "книги"){
      urlCategory = "DigitalBookCategory";
    }
    if (category === "аудио книги"){
      urlCategory = "AudioBookCategory";
    }
    console.log("URL Category:", urlCategory);
    
    return urlCategory;
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
                        <PaymentReveal/>
                    </div>
                    <div className="detail__info">
                        <nav className="detail__info__nav">
                          <ul className='detail__info__list' >
                            <li className="detail__info__nav__item">
                              <Link>Главная</Link>
                              <img src={ArrowUrl} alt="" />
                            </li>
                            <li className="detail__info__nav__item">
                             <Link target='_blank' to={`http://localhost:3000/${urlCategory()}`}>{productFilm.product_film_category}</Link>
                             <img src={ArrowUrl} alt="" />
                            </li>
                            <li className="detail__info__nav__item">
                              <Link target='_blank' to={`http://localhost:3000/product/${productFilm.id}`} >ID {productFilm.id}</Link> 
                            </li>
                          </ul>
                        </nav>
                        <h2 className="detail__info__title">{productFilm.productFilmTitle}</h2>
                        <div className="detail__info__desc">
                          <h3 className="detail__info__desc__title">Описание</h3>
                          <div className="detail__info__desc__text">{formatText(productFilm.product_film_desc)}</div>
                        </div>
                    </div>
                    <PaymentHide/>
                </div>
            </div>
        </section>
    </>
  );
};

export default ProductDetailsPage;
