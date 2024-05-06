import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProductDetailsPage.scss';
import { Link } from 'react-router-dom';
import ArrowUrl from '/arrow_right_url.webp';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import ShareImg from '/share_offer.webp';
import ShareModal from '../../Components/ShareModal/ShareModal';
import UseFavorites from './UseFavorites'; 
import CreatePayment from '../../CreatePayment';
import { supabase } from '../../supabase';
// import GetEmailAvatar from '../../GetEmailAvatar';



const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [productFilm, setProductFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // favorite
  const { addToFavorites } = UseFavorites();
  // Use the CreatePayment component here
  const { createPayment } = CreatePayment();


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

   // Создайте состояние для userImage
   const [userImage, setUserImage] = useState('');

   useEffect(() => {
     // Получение userEmail
     supabase.auth.onAuthStateChange((event, session) => {
       if (session) {
         setUserEmail(session.user.email);
         setUserImage(session.user.user_metadata.avatar_url); // Установите userImage здесь
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


  // payment hide
function PaymentHide(){
  return(
    <div className="detail__payment payment_hide">
    <h3 className="detail__payment__cost">{productFilm.product_film_cost} ₽</h3>
    <div className='detail__payment__buttons' >
    <div onClick={() => createPayment({ ...productFilm, product_film_key: productFilm.product_film_key })} >
        <BaseBtn   BtnText="Купить" />
      </div>
      <div onClick={() => addToFavorites(productFilm, userEmail)} className='detail__payment__button' > 
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
      <div onClick={() => addToFavorites(productFilm, userEmail)} className='detail__payment__button' > 
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
    if (category === "электронные книги"){
      urlCategory = "DigitalBookCategory";
    }
    if (category === "аудио книги"){
      urlCategory = "AudioBookCategory";
    }
    // console.log("URL Category:", urlCategory);
    
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
                            {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocLJtpwmuWbUNyXtmM1u2wKSHZP1cQl3rcTCR9a1UoOf7eJ1wNw=s96-c" 
                            alt="" className="detail__short__seller__img" /> */}
                            <img src={productFilm.product_film_seller_avatar} 
                            alt="" className="detail__short__seller__img" />
                            <span className="detail__short__seller__mail">{productFilm.product_film_seller_email}</span>
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
