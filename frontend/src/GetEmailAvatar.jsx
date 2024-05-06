import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const GetEmailAvatar = ({ setUserEmail }) => {
    useEffect(() => {
        const getUserData = async () => {
            const { user } = await supabase.auth.getUser();
            setUserEmail(user?.email || '');
        };
        getUserData();
    }, [setUserEmail]);

    useEffect(() => {
        const getUserEmail = () => {
            supabase.auth.onAuthStateChange((event, session) => {
                if (session) {
                    setUserEmail(session.user.email || '');
                } else {
                    setUserEmail('');
                }
            });
        };
        getUserEmail();
    }, [setUserEmail]);

    return null; 
};

export default GetEmailAvatar;
