import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import './SellerEdit.scss';

const SellerEdit = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const cleanedProductId = productId.substring(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState('');
    
    
    const [productFields, setProductFields] = useState({
        productFilmTitle: '',
        productFilmDesc: '',
        productFilmCost: '',
        productFilmCategory: '',
        productFilmKey: '',
        productImageURL: '',
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('productFilm')
                .select('*')
                .eq('id', cleanedProductId)
                .single();
            if (error) {
                throw new Error('Ошибка при загрузке товара');
            }
            setProduct(data);
            setProductFields({
                productFilmTitle: data.productFilmTitle,
                productFilmDesc: data.product_film_desc,
                productFilmCost: data.product_film_cost,
                productFilmCategory: data.product_film_category,
                productFilmKey: data.product_film_key,
                productImageURL: data.productImage,
            });
        } catch (error) {
            console.error('Ошибка:', error.message);
            setFormError('Ошибка при загрузке товара');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';
    
        // Если поле цены, проверяем, чтобы значение было от 1 до 100000
        if (name === 'productFilmCost') {
            const intValue = parseInt(value);
            if (intValue < 1 || intValue > 100000 || isNaN(intValue)) {
                errorMessage = 'Цена должна быть от 1 до 100000';
            }
        }
        
        // Обновляем состояние
        setProductFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    
        // Устанавливаем сообщение об ошибке
        setFormError(errorMessage);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Проверяем, что значение цены находится в допустимом диапазоне
        const intValue = parseInt(productFields.productFilmCost);
        if (intValue < 1 || intValue > 100000 || isNaN(intValue)) {
            setFormError('Цена должна быть от 1 до 100000');
            return; // Прерываем отправку формы
        }
    
        try {
            await supabase
                .from('productFilm')
                .update({
                    productFilmTitle: productFields.productFilmTitle,
                    product_film_desc: productFields.productFilmDesc,
                    product_film_cost: productFields.productFilmCost,
                    product_film_category: productFields.productFilmCategory,
                    product_film_key: productFields.productFilmKey,
                    productImage: productFields.productImageURL,
                })
                .eq('id', cleanedProductId);
            navigate('/seller'); // Перенаправление пользователя по указанному маршруту
        } catch (error) {
            console.error('Ошибка при обновлении товара:', error.message);
            setFormError('Ошибка при обновлении товара');
        }
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Товар не найден</p>;
    }


    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setProductFields((prevState) => ({
            ...prevState,
            productFilmCategory: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setProductFields((prevState) => ({
                ...prevState,
                productImageURL: reader.result,
                productImageName: file.name, // сохраняем имя файла
            }));
        };
    
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    
    
    return (
        <section className="first-element add-product">
            <div className="container">
                <h2 className='edit__product' >Редактировать товар</h2>
                <form onSubmit={handleSubmit} className="add-product-wrapper">
                    <div>
                        <label className='add-product__title' htmlFor="productFilmTitle">Название:</label>
                        <input
                            type="text"
                            id="productFilmTitle"
                            name="productFilmTitle"
                            value={productFields.productFilmTitle}
                            onChange={handleChange}
                        />
                         <label className='add-product__desc' htmlFor="productFilmKey">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
                    </div>

                    <div>
                        <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
                        <textarea
                            type="text"
                            id="productFilmDesc"
                            name="productFilmDesc"
                            value={productFields.productFilmDesc}
                            onChange={handleChange}
                        />
                         <label className='add-product__desc' htmlFor="productFilmKey">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
                    </div>

                    <div>
                        <label className='add-product__title' htmlFor="productFilmKey">Ключ от товара:</label>
                        <input
                            type="text"
                            id="productFilmKey"
                            name="productFilmKey"
                            value={productFields.productFilmKey}
                            onChange={handleChange}
                        />
                        <label className='add-product__desc' htmlFor="productFilmKey">Код от игры/промокод/ссылка, или другой формат ключа. Будет доступен покупателю после покупки</label>
                    </div>

                    <div>
                        <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
                        <input
                            type="number"
                            id="productFilmCost"
                            name="productFilmCost"
                            value={productFields.productFilmCost}
                            onChange={handleChange}
                        />
                        <label className='add-product__desc' htmlFor="productFilmKey">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
                    </div>

                    <div className='add-product__select__container'>
                            <label className='add-product__title' htmlFor="productFilmCategory">Категория:</label>
                            <select
                                id='productFilmCategory'
                                className='add-product__select'
                                value={productFields.productFilmCategory}
                                onChange={handleCategoryChange}
                            >
                                <option value="">Выберите категорию</option>
                                <option value="Кино">Кино</option>
                                <option value="Игры">Игры</option>
                                <option value="Аудио Книги">Аудио Книги</option>
                                <option value="Электронные книги">Электронные книги</option>
                            </select>
                        </div>


                    <div>
                        <label className='add-product__title' htmlFor="productImageUpload">Выбрать изображение:</label>
                        <input
                            type="file"
                            id="productImageUpload"
                            name="productImageUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                     {productFields.productImageURL && (
                            <p style={{ color: 'green' }}>Выберите новое изображение, если нужно {productFields.productImageName}</p>
                        )}

                    </div>

                    <div>
                        <BaseBtn BtnText="Сохранить изменения" />
                    </div>

                    {formError && <p className="error" style={{ color: 'red' }}>{formError}</p>}

                </form>
            </div>
        </section>
    );
};

export default SellerEdit;
