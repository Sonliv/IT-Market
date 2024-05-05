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
    if (modalRef.current && !modalRef.current.contains(event.target)) {
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
          <button onClick={copyToClipboard}><img src={CopyLink} alt="" /></button>
        </div>
        {copySuccess && <span className="copy-success">Ссылка скопирована!</span>}
        <button className='modal__share__social__link'  onClick={openTelegram}>
          {/* <p>Поделиться в Telegram :</p> */}
          <img src={TgLogo} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
