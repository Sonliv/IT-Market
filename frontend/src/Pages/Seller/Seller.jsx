import { useState, useEffect } from 'react';
import GetEmailAvatar from '../../GetEmailAvatar';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';
import Empty from '../../Components/Empty/Empty';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import preload2 from '/preload2.gif';
import { supabase } from '../../supabase';
import Garbage from '/garbage.webp';

const Seller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {


    fetchData();
    }, [userEmail]);

    

    const fetchData = async () => {
        if (!userEmail) {
            setLoading(false);
            return;
        }
    
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('productFilm')
                .select('id, product_film_desc, product_film_cost, productFilmTitle, productImage')
                .eq('product_film_seller_email', userEmail)
                .is('product_film_buyed', null); // изменение здесь
            if (error) {
                throw new Error('Ошибка при загрузке товаров продавца');
            }
            setProducts(data);
        } catch (error) {
            console.error('Ошибка:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    
    const openModal = (productId) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('productFilm')
                .upsert([{ product_film_buyed: 'buyed', id: selectedProductId }], { onConflict: ['id'] });
            if (error) {
                throw new Error('Ошибка при добавлении или обновлении товара');
            }
            console.log('Товар успешно добавлен или обновлен');
        } catch (error) {
            console.error('Ошибка при добавлении или обновлении товара:', error.message);
        } finally {
            closeModal(); // Закрыть модальное окно после добавления или обновления товара
        }
    };
    
    

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("modal-overlay__favorite")) {
            closeModal();
        }
    };

    

    return (
        <section className='seller first-element'>
            <div className="container">
                <GetEmailAvatar setUserEmail={setUserEmail} />
                {loading ? (
                    <div className="preload-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <img src={preload2} alt="" className="preload-img" />
                    </div>
                ) : userEmail ? (
                    <div>
                        {error ? (
                            <p>Ошибка: {error}</p>
                        ) : products.length > 0 ? (
                            <>
                                <h2 className="favorite__title">Ваши товары</h2>
                                <div className="favorite__wrapper">
                                {products
                                    .filter(product => product.product_film_buyed !== 'buyed')
                                    .map((product) => (
                                        <div key={product.id} className="favorite__item">
                                            <Link to={`/product/${product.id}`} className="product-item-link">
                                                <div className="favorite__item__img__wrapper">
                                                    <img
                                                        src={product.productImage}
                                                        alt=""
                                                        className="favorite__item__img"
                                                    />
                                                </div>
                                                <h3 className="favorite__item__title">{product.productFilmTitle}</h3>
                                                <span className="favorite__item__cost">{product.product_film_cost} ₽</span>
                                                <p className="favorite__item__desc">{product.product_film_desc}</p>
                                            </Link>
                                            <div className='favorite__buttons__wrapper'>
                                                <div>
                                                    <Link to={`/Seller/:${product.id}`}>
                                                        <BaseBtn BtnText="Редактировать" />
                                                    </Link>
                                                </div>
                                                <img
                                                    src={Garbage}
                                                    alt=""
                                                    className='delete'
                                                    onClick={() => openModal(product.id)} 
                                                />
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </>
                        ) : (
                            <Empty
                                url={PATHS.ADDPRODUCT}
                                desc="Вы ещё не"
                                spanText="добавили товары"
                                btnText="Добавить товар"
                            />
                        )}
                    </div>
                ) : (
                    <Empty
                        url={PATHS.LOGIN}
                        desc="Авторизуйтесь, чтобы увидеть"
                        spanText="ваши товары"
                        btnText="Авторизоваться"
                    />
                )}
            </div>
            {isModalOpen && (
                <div className="modal-overlay__favorite" onClick={handleOverlayClick}>
                    <div className="modal__favorite">
                        <span className="modal-close__favorite" onClick={closeModal}>×</span>
                        <h3>Вы уверены?</h3>
                        <p>Товар будет удален из списка ваших товаров</p>
                        <div className="modal-buttons__favorite">
                        <div onClick={handleDeleteProduct} className='red__button__favorite'>
                            <BaseBtn BtnText="Да" />
                        </div>

                            <div onClick={closeModal} className='close__btn__modal'>
                                <BaseBtn BtnText="Нет" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Seller;
