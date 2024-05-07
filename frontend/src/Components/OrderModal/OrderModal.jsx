import { useState, useEffect, useRef } from 'react';
import CopyLinkIcon from '/copy__link.webp';
import './OrderModal.scss';

const OrderModal = ({ onClose, orderKey }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const modalRef = useRef(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(orderKey);
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

    return (
        <div className="modal-overlay">
            <div className="modal" ref={modalRef}>
                <div className="modal-header">
                    <span className="close__btn" onClick={onClose}>&times;</span>
                </div>
                <h2 className='modal__share__title'>Скопируйте ключ товара</h2>
                <p className='modal__share__desc'>Нажмите на иконку возле <span>ключа</span>, чтобы его <strong>скопировать</strong></p>
                <div className='modal__share__input__wrapper'>
                    <input className='modal__share__input' type="text" value={orderKey} readOnly />
                    <button className='share__hide' onClick={copyToClipboard}><img src={CopyLinkIcon} alt="Copy link" /></button>
                </div>
                {copySuccess && <p className="copy-success">Ссылка скопирована!</p>}
                <div className='share__buttons'>
                    <button className='share__reveal' onClick={copyToClipboard}>
                        <img src={CopyLinkIcon} alt="Copy link" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
