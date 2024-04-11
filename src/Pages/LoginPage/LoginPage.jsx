import './LoginPage.scss'

import { createClient } from '@supabase/supabase-js';
import { Auth }  from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect, useState } from 'react';



const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
);



const LoginPage = () => {

    const navigate = useNavigate()
    const [session, setSession] = useState(null)

    // supabase.auth.onAuthStateChange(async (event, session) => {
    //     if (session) {
    //         // Forward to success url
    //         navigate("/SuccessLogin")
    //     }
    // })

    useEffect(() => {
      supabase.auth.getSession().then(({data: {session}}) => {
        setSession(session)
      })

      const { data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    if(!session){
      return (
        <div className="first-element">
            <div className="auth">
                <Auth
                supabaseClient={supabase}
                appearance={{theme: ThemeSupa}}
                theme='dark'
                providers={['discord', 'google']}
                localization={{
                    variables: {
                      sign_in: {
                        email_label: 'Введите адрес вашей почты',
                        password_label: 'Введите пароль',
                        email_input_placeholder: 'Ваша почта',
                        password_input_placeholder: 'Ваш пароль',
                        loading_button_label: 'Входим',
                        social_provider_text: 'Войти с  {{provider}}',
                        link_text: 'Нет аккаунта? Зарегистрируйтесь',
                        confirmation_text: 'Проверьте вашу почту для подтверждения',
                        button_label: 'Войти',
                      },
                      sign_up: {
                        email_label: 'Введите адрес вашей почты',
                        password_label: 'Введите пароль',
                        email_input_placeholder: 'Ваша почта',
                        password_input_placeholder: 'Ваш пароль',
                        loading_button_label: 'Входим',
                        social_provider_text: 'Зарегистрироваться с  {{provider}}',
                        link_text: 'Есть аккаунт? Войдите',
                        confirmation_text: 'Проверьте вашу почту для подтверждения',
                        button_label: 'Зарегистрироваться',
                      },
                      forgotten_password: {
                        email_label: 'Введите адрес вашей почты',
                        password_label: 'Введите пароль',
                        email_input_placeholder: 'Ваша почта',
                        password_input_placeholder: 'Ваш пароль',
                        button_label: 'Отправить письмо для подтверждения',
                        loading_button_label: 'Отправка письма со сбросом пароля',
                        link_text: 'Забыли ваш пароль?',
                        confirmation_text: 'Проверьте вашу почту для сброса пароля',
                        // button_label: '',
                      },
                    },
                  }}
                />
            </div>
        </div>
      )
    }
    else {
      return(
        navigate('/SuccessLogin')
      )
    }

}

export default LoginPage;