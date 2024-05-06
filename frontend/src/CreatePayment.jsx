import axios from 'axios';
import { useState, useEffect } from 'react';
import { supabase } from './supabase';

const CreatePayment = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        console.log('Fetching user...');
        supabase.auth.onAuthStateChange((event, session) => {
          if (session) {
            setUserEmail(session.user.email);
          } else {
            setUserEmail("Имя");
          }
        });
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    console.log('Fetching user email...');
    fetchUserEmail();
  }, []);

  const createPayment = async (product) => {
    try {
      console.log('userEmail:', userEmail);
      const response = await axios.post('http://localhost:3001/create-payment', {
        productName: product.productFilmTitle,
        price: product.product_film_cost,
        userEmail: userEmail,
        product_id: product.id,
        product_img: product.productImage,
        product_film_key: product.product_film_key
      });

      if (!response.data.paymentUrl) {
        throw new Error('Failed to get payment URL');
      }

      window.open(response.data.paymentUrl, '_blank');
    } catch (error) {
      console.error('Error creating payment:', error.message);
    }
  };

  return { createPayment };
};

export default CreatePayment;
