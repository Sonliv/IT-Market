import { useState, useEffect } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import './AddProduct.scss';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../router';
import { supabase } from '../../supabase';


const AddProduct = () => {
    const navigate = useNavigate();

    const [productFilmTitle, setProductFilmTitle] = useState('');
    const [productFilmDesc, setProductFilmDesc] = useState('');
    const [productFilmCost, setProductFilmCost] = useState('');
    const [productFilmCategory, setProductFilmCategory] = useState('');
    const [productFilmKey, setProductFilmKey] = useState('');
    const [formError, setFormError] = useState('');
    const [productImageURL, setProductImageURL] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [sellerEmail, setSellerEmail] = useState('');
    const [sellerAvatar, setSellerAvatar] = useState('');

    useEffect(() => {
        const getUserAvatar = () => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (session) {
                    setSellerAvatar(session.user.user_metadata.avatar_url);
                } else {
                    setSellerAvatar('');
                }
            });
        };
        getUserAvatar();
    }, []);
    



    useEffect(() => {
        const getUserEmail = () => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (session) {
                    setSellerEmail(session.user.email || '');
                } else {
                    setSellerEmail('');
                }
            });
        };
        getUserEmail();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Проверка на заполнение всех полей и загрузку изображения
        if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL || !productFilmCategory || !productFilmKey) {
            setFormError(<p className="test">Произошла ошибка. Заполните все поля и добавьте изображение и ключ товара</p>);
            scrollToError();
            return;
        }
    
        // Проверка на валидность цены
        const cost = parseFloat(productFilmCost);
        if (isNaN(cost) || cost < 1 || cost > 100000) {
            setFormError(<p className="test">Цена должна быть числом в диапазоне от 1 до 100000</p>);
            scrollToError();
            return;
        }
    
        submitForm();
    };
    

    const scrollToError = () => {
        const errorElement = document.getElementById('form-error');
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const submitForm = async () => {
        const { data, error } = await supabase.from('productFilm').insert([
            {
                productFilmTitle,
                product_film_desc: productFilmDesc,
                product_film_cost: productFilmCost,
                product_film_category: productFilmCategory,
                product_film_key: productFilmKey,
                productImage: productImageURL,
                product_film_seller_avatar: sellerAvatar, // Устанавливаем аватарку продавца
                product_film_seller_email: sellerEmail
            }
        ]).select();

        if (error) {
            console.error(error);
            setFormError(<p className="test">Произошла ошибка при добавлении товара</p>);
            scrollToError();
        } else {
            console.log(data);
            navigate(PATHS.HOME);
        }
    };

    const handleImageUpload = async (e) => {
        setIsUploading(true);
        const file = e.target.files[0];
        const fileName = `${file.name}_${Date.now()}`;
        const { error } = await supabase.storage.from('product_img').upload(fileName, file);
        if (error) {
            console.error(error);
            setFormError(<p className="test">Произошла ошибка при загрузке изображения</p>);
            scrollToError();
        } else {
            console.log('Файл успешно загружен');
            setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
            setFormError('');
        }
        setTimeout(() => {
            setIsUploading(false);
        }, 3000);
    };

    return (
        <>
            <div className="first-element"></div>
            <section className="add-product">
                <div className="container">
                    <form onSubmit={handleSubmit} className="add-product-wrapper">
                        <div>
                            <label className='add-product__title' htmlFor="productFilmTitle">Название:</label>
                            <input
                                type="text"
                                id='productFilmTitle'
                                value={productFilmTitle}
                                onChange={(e) => setProductFilmTitle(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
                            <textarea
                                type="text"
                                id='productFilmDesc'
                                value={productFilmDesc}
                                onChange={(e) => setProductFilmDesc(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmKey">Ключ от товара:</label>
                            <input
                                type="text"
                                id='productFilmKey'
                                value={productFilmKey}
                                onChange={(e) => setProductFilmKey(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmKey">Код от игры/промокод/ссылка, или другой формат ключа. Будет доступен покупателю после покупки </label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
                            <input
                                type="number"
                                id='productFilmCost'
                                value={productFilmCost}
                                onChange={(e) => setProductFilmCost(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmTitle">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmCategory">Категория:</label>
                            <div className='add-product__select__container' >  
                                <select
                                    id='productFilmCategory'
                                    className='add-product__select'
                                    value={productFilmCategory}
                                    onChange={(e) => setProductFilmCategory(e.target.value)}
                                >
                                    <option value="">Выберите категорию</option>
                                    <option value="Кино">Кино</option>
                                    <option value="Игры">Игры</option>
                                    <option value="Аудио Книги">Аудио Книги</option>
                                    <option value="Электронные книги">Электронные книги</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmCategory">Выбрать изображение:</label>
                            <div className='file-input-container'>
                                <label className='custom-file-button' htmlFor="productImage">
                                    Выберите файл
                                </label>
                                <input className='custom-file-input' type="file" id="productImage" onChange={handleImageUpload} />
                                {isUploading && <img className="preload-gif" src="/preload.gif" alt="Загрузка..." />}
                                <span className={`file-selected-text ${productImageURL ? 'selected' : 'not-selected'}`}>
                                    {productImageURL ? 'Изображение выбрано' : 'Нет выбранного файла'}
                                </span>
                            </div>
                        </div>

                        <div className="add-product__button">
                            <BaseBtn BtnText="Опубликовать" />
                        </div>

                        {formError && <p id="form-error" className='error'>{formError}</p>}
                    </form>
                </div>
            </section>
        </>
    );
}

export default AddProduct;


