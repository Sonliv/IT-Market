import { useState } from 'react';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
);

const UseFavorites = () => {
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

  const addToFavorites = async (product, userEmail) => {
    try {
      if (isAddingToFavorites) {
        return;
      }

      setIsAddingToFavorites(true);

      const { data: existingFavorites, error: existingError } = await supabase
        .from('favorites')
        .select()
        .eq('favorites_id', product.id)
        .eq('favorites_email', userEmail);

      if (existingError) {
        throw existingError;
      }

      if (existingFavorites.length > 0) {
        console.log('Товар уже добавлен в избранное');
        return;
      }

      await supabase
        .from('favorites')
        .insert({
          favorites_id: product.id,
          favorites_title: product.productFilmTitle,
          favorites_cost: product.product_film_cost,
          favorites_desc: product.product_film_desc,
          favorites_img: product.productImage,
          favorites_email: userEmail
        });

      console.log('Товар добавлен в избранное');

    } catch (error) {
      console.error('Ошибка добавления товара в избранное:', error.message);
    } finally {
      setTimeout(() => {
        setIsAddingToFavorites(false);
      }, 1000);
    }
  };

  return { addToFavorites };
};

export default UseFavorites;
