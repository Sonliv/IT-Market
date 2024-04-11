import './SuccessLogin.scss';

import { createClient } from '@supabase/supabase-js';
// import { Auth }  from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared';
import  {useEffect, useState} from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../router';



const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', // Supabase URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
);

const SuccessLogin = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if(value.data?.user){
                    // console.log(value.data.user);
                    setUser(value.data.user);
                }
            })
        }
        getUserData();
    }, []);

    async function signOutUser(){
        const { error } = await supabase.auth.signOut();
    }

    return (
        <div>
            { user.length !== 0 ?
                    <>
                    {/* <div className='first-element info-success' >
                        <div>Вы вошли в свою учетную запись!</div>
                        <button onClick={() => signOutUser()} >Выйти</button>
                    </div> */}
                        <section className="first-element  success">
                            <div className="container">
                                <div className="success__container">
                                {/* <div className='info-success' >
                                        <div>Ваши <strong>Заказы</strong></div>
                                        <span>Купленные вами товары</span>
                                    </div>
                                    <div className='info-success' >
                                        <div>Создать карточку товара</div>
                                        <span>Добавить новый товар</span>
                                    </div> */}
                                     <div className='info-success' >
                                        <div className='info-success__title' >Вы вошли в свою учетную запись!</div>
                                        {/* <button onClick={() => signOutUser()} >Выйти</button> */}
                                        <div>
                                            {/* <Link onClick={() => {navigate ("/") }} >
                                                <BaseBtn BtnText="На главную" />
                                            </Link> */}
                                            {/* <div onClick={() => {navigate ("/") }} >
                                            <BaseBtn BtnText="На главную" />
                                            </div> */}
                                           <Link to = {PATHS.HOME} >
                                            <BaseBtn BtnText="На главную" />
                                           </Link>
                                        </div>
                                    </div>
                                    <div className='info-success' >
                                    <div className='info-success__title'>Вы уже вошли</div>
                                    <Link to={PATHS.HOME} onClick={() => signOutUser()} className="info-success__btn__logout">
                                        <BaseBtn BtnText="Выйти" />
                                    </Link>
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

