/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import './ShareModal.scss'; // Подключаем стили модального окна
import CopyLink from '/copy__link.webp';
import TgLogo from '/tg__icon.webp'

const ShareModal = ({ onClose, productUrl, productName }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const modalRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl);
    setCopySuccess(true);
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current && 
      !modalRef.current.contains(event.target) &&
      !event.target.closest('.modal')
    ) {
      onClose();
    }
  };
  

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const openTelegram = () => {
    const message = encodeURIComponent(`Посмотри этот товар: ${productName}`);
    window.open(`https://t.me/share/url?url=${productUrl}&text=${message}`, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <div className="modal-header">
          <span className="close__btn" onClick={onClose}>&times;</span>
        </div>
        <h2 className='modal__share__title' >Поделиться ссылкой на товар</h2>
        <p className='modal__share__desc' >Скопируйте ссылку ниже и отправьте ее друзьям:</p>
        <div className='modal__share__input__wrapper' > 
          <input className='modal__share__input' type="text" value={productUrl} readOnly />
          <button className='share__hide' onClick={copyToClipboard}><img src={CopyLink} alt="" /></button>
        </div>
        {copySuccess && <p className="copy-success">Ссылка скопирована!</p>}
        <div className='share__buttons' >
          <button className='modal__share__social__link'  onClick={openTelegram}>
            <img src={TgLogo} alt="" />
          </button>
          <button className='share__reveal' onClick={copyToClipboard}>
            <img src={CopyLink} alt="" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
