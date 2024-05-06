import { useState } from 'react';
import { supabase } from '../../supabase';
import GetEmailAvatar from '../../GetEmailAvatar';

const UseFavorites = () => {
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  // const [userEmail, setUserEmail] = useState('');
  

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
