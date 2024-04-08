
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'
import './AddProduct.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { createClient } from '@supabase/supabase-js';


const AddProduct = () => {

    const supabase = createClient(
        'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
    );

    const navigate = useNavigate()


    const  [productFilmTitle, setproductFilmTitle] = useState ('')
    const  [product_film_desc, setproduct_film_desc] = useState ('')
    const  [product_film_cost, setproduct_film_cost] = useState ('')
    const  [formError, setFormError] = useState (null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!productFilmTitle || !product_film_desc || !product_film_cost ){
            setFormError('Пожалуйста, заполните все поля')
            return
        }


        const { data, error} = await supabase
        .from('productFilm')
        .insert([{productFilmTitle, product_film_desc, product_film_cost}])
        .select()

        if(error){
            console.log(error)
            setFormError('Пожалуйста, заполните все поля')
        }

        if(data){
            console.log(data)
            setFormError(null)
            navigate('/')
        }
    }


    return (
        <>
        <div className="first-element"></div>
        <section className="add-product">
            <div className="container">
                <form onSubmit={handleSubmit} className="add-product-wrapper">
                    <div>
                        <label htmlFor="productFilmTitle">Название:</label>
                        <input 
                        type="text"
                        id='productFilmTitle'
                        value={productFilmTitle}
                        onChange={(e) => setproductFilmTitle(e.target.value)}
                        />
                    </div>

                  <div>
                    <label htmlFor="product_film_desc">Описание:</label>
                        <textarea 
                        type="text"
                        id='product_film_desc'
                        value={product_film_desc}
                        onChange={(e) => setproduct_film_desc(e.target.value)}
                        />
                  </div>


                    <div>
                        <label htmlFor="product_film_cost">Цена:</label>
                        <input 
                        type="number"
                        id='product_film_cost'
                        value={product_film_cost}
                        onChange={(e) => setproduct_film_cost(e.target.value)}
                        />
                    </div>

                     <BaseBtn BtnText= "Опубликовать" />

                     {formError && <p className='error' >{formError}</p> }
                </form>
            </div>
        </section>
        </>
    );
}
 
export default AddProduct;


