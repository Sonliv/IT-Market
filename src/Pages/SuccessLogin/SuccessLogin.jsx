/* eslint-disable no-unused-vars */
import './SuccessLogin.scss';

import { createClient } from '@supabase/supabase-js';
// import { Auth }  from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared';
import  {useEffect, useState} from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';
import yaPlus from '/yaPlus.webp';
import userImg from '/user.svg'


const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', // Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
);

const SuccessLogin = () => {
    const [user, setUser] = useState({});
    const [userEmail, setUserEmail] = useState([])
    const [userImage, setUserImage] = useState([])

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if(value.data?.user){
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);

    useEffect(() => {
        const getUserEmail = () => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (session) {
                    setUserEmail(session.user.email);
                    setUserImage(session.user.user_metadata.avatar_url)
                } else {
                    setUserEmail("Имя");
                }
            });
        };
        getUserEmail();
    }, [])

    async function signOutUser(){
        const { error } = await supabase.auth.signOut();
    }

    return (
        <div>
            { user.length !== 0 ?
                    <>
                        <section className="first-element  success">
                            <div className="container">
                                <div className="success__container">
                                     <div className='info-success' >
                                        <div className='info-success__title' >Вы вошли в свою учетную запись!</div>
                                        {/* <button onClick={() => signOutUser()} >Выйти</button> */}
                                        <div>
                                           <Link to = {PATHS.HOME} >
                                            <BaseBtn BtnText="На главную" />
                                           </Link>
                                        </div>
                                    </div>
                                    <div className='info-success exit' >
                                    <div className='info-success__title'>Выйти из учетной записи</div>
                                    <Link to={PATHS.HOME} onClick={() => signOutUser()} className="info-success__btn__logout">
                                        <BaseBtn BtnText="Выйти" />
                                    </Link>
                                    </div>

                                    <div className='info-success order-success' >
                                        <div className='info-success__title'>Заказы</div>
                                        <div className='info-success__order__wrapper' >
                                            <div className="info-success__order">
                                                <div className="info-success__order__img">
                                                    <img src={yaPlus} alt="" />
                                                </div>
                                                <div className='info-success__order__text' >
                                                    <h3 className="info-success__order__text__title">Дотка 2</h3>
                                                    {/* <p className="info-success__order__text__desc">игра бомба игра бомба игра бомба игра бомба</p> */}
                                                    <span className="info-success__order__text__key">Ключ товара: <strong>fwdfwk232qdqskdk2</strong></span>
                                                </div>
                                            </div>
                                            <div className="info-success__order">
                                                <div className="info-success__order__img">
                                                    <img src={yaPlus} alt="" />
                                                </div>
                                                <div className='info-success__order__text' >
                                                    <h3 className="info-success__order__text__title">Дотка 2</h3>
                                                    <span className="info-success__order__text__key">Ключ товара: <strong>fwdfwk232qdqskdk2</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='info-success order-success user' >
                                        <div className='info-success__title'>Информация о пользователе</div>
                                        <div className="info-success__order">
                                            <div className="info-success__order__img">
                                                {/* <img src={userImg} alt="" /> */}
                                                <img src={!userImage ? userImg : userImage} alt="" />
                                            </div>
                                            <div className='info-success__order__text' >
                                                <h3 className="info-success__order__text__title">{userEmail}</h3>
                                                {/* <p className="info-success__order__text__desc">Товары</p> */}
                                                <div className='info-success__order__text__button' >
                                                 <BaseBtn BtnText="Товары" />
                                                </div>
                                                {/* <span className="info-success__order__text__key">fwdfwk232qdqskdk2</span> */}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </>
                    :
                    <>
                        <section className="first-element success">
                            <div className="container">
                                <div className="info-success">
                                    <div className='first-element'>Вы не вошли в систему.</div>
                                    {/* <button onClick={() => {navigate ("/") }} >На главную</button> */}
                                    <Link to={PATHS.HOME}/>
                            </div>
                            </div>
                        </section>
                    </>
            } 
        </div>
    );
}
 
export default SuccessLogin;

