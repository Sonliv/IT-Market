

import './LoginPage.scss'
import { createClient } from '@supabase/supabase-js';
import { Auth }  from '@supabase/auth-ui-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
    )
    ;

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const onAuthStateChange = (event) => {
            if (event !== "SUGNED_OUT") {
                // Forward to success url
                navigate("/SuccessLogin")
            } else {
                // Forward to localHost
                navigate ("/")
            }
        };

        // Подписываемся на события аутентификации при монтировании компонента
        supabase.auth.onAuthStateChange(onAuthStateChange);

        // Отписываемся от событий при размонтировании компонента
        return () => {
            supabase.auth.removeSubscription(onAuthStateChange);
        };
    }, [navigate]);

    return (
        <div className="first-element">
            <Auth
                supabaseClient={supabase}
                theme='dark'
                providers={['discord']}
            />
        </div>
    );
}

export default LoginPage;
