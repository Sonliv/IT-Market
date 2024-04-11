
// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'
// import './AddProduct.scss'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'


// import { createClient } from '@supabase/supabase-js';


// const AddProduct = () => {

//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo' // API Key
//     );

//     const navigate = useNavigate()


//     const  [productFilmTitle, setproductFilmTitle] = useState ('')
//     const  [product_film_desc, setproduct_film_desc] = useState ('')
//     const  [product_film_cost, setproduct_film_cost] = useState ('')
//     const  [formError, setFormError] = useState (null)

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (!productFilmTitle || !product_film_desc || !product_film_cost ){
//             setFormError('Пожалуйста, заполните все поля')
//             return
//         }


//         const { data, error} = await supabase
//         .from('productFilm')
//         .insert([{productFilmTitle, product_film_desc, product_film_cost}])
//         .select()

//         if(error){
//             console.log(error)
//             setFormError('Пожалуйста, заполните все поля')
//         }

//         if(data){
//             console.log(data)
//             setFormError(null)
//             navigate('/')
//         }
//     }

//     // Upload file using standard upload
// async function uploadFile(file) {
//     const { data, error } = await supabase.storage.from('product_img').upload('product', file)
//     if (error) {
//         console.log(error)
//     } else {
//         console.log('upload =)')
//     }
//   }

//     return (
//         <>
//         <div className="first-element"></div>
//         <section className="add-product">
//             <div className="container">
//                 <form onSubmit={handleSubmit} className="add-product-wrapper">
//                     <div>
//                         <label htmlFor="productFilmTitle">Название:</label>
//                         <input 
//                         type="text"
//                         id='productFilmTitle'
//                         value={productFilmTitle}
//                         onChange={(e) => setproductFilmTitle(e.target.value)}
//                         />
//                     </div>

//                   <div>
//                     <label htmlFor="product_film_desc">Описание:</label>
//                         <textarea 
//                         type="text"
//                         id='product_film_desc'
//                         value={product_film_desc}
//                         onChange={(e) => setproduct_film_desc(e.target.value)}
//                         />
//                   </div>


//                     <div>
//                         <label htmlFor="product_film_cost">Цена:</label>
//                         <input 
//                         type="number"
//                         id='product_film_cost'
//                         value={product_film_cost}
//                         onChange={(e) => setproduct_film_cost(e.target.value)}
//                         />
//                     </div>
//                     <input type="file" 
//                     name="" 
//                     id="" /> {uploadFile}

//                      <BaseBtn BtnText= "Опубликовать" />

//                      {formError && <p className='error' >{formError}</p> }
//                 </form>
//             </div>
//         </section>
//         </>
//     );
// }
 
// export default AddProduct;




// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'
// import './AddProduct.scss'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate()

//     const [productFilmTitle, setProductFilmTitle] = useState('')
//     const [productFilmDesc, setProductFilmDesc] = useState('')
//     const [productFilmCost, setProductFilmCost] = useState('')
//     const [formError, setFormError] = useState(null)

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost) {
//             setFormError('Пожалуйста, заполните все поля')
//             return
//         }

//         // Загрузка файла и получение его имени
//         const fileInput = document.querySelector('input[type="file"]')
//         if (fileInput.files.length > 0) {
//             const file = fileInput.files[0]
//             const fileName = await uploadFile(file)
//             if (fileName) {
//                 // Если файл успешно загружен, добавляем данные в базу
//                 const { data, error } = await supabase.from('productFilm').insert([
//                     { productFilmTitle, productFilmDesc, productFilmCost, productImage: fileName }
//                 ]).select()

//                 if (error) {
//                     console.error(error)
//                     setFormError('Произошла ошибка при добавлении товара')
//                 } else {
//                     console.log(data)
//                     setFormError(null)
//                     navigate('/')
//                 }
//             } else {
//                 setFormError('Произошла ошибка при загрузке файла')
//             }
//         } else {
//             setFormError('Пожалуйста, выберите файл для загрузки')
//         }
//     }

//     // Загрузка файла в хранилище Supabase
//     async function uploadFile(file) {
//         const { data, error } = await supabase.storage.from('product_img').upload(file.name, file)
//         if (error) {
//             console.error(error)
//             return null
//         } else {
//             console.log('Файл успешно загружен')
//             return file.name
//         }
//     }

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productImage">Изображение товара:</label>
//                             <input type="file" id="productImage" />
//                         </div>

//                         <BaseBtn BtnText="Опубликовать" />

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn'
// import './AddProduct.scss'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate()

//     const [productFilmTitle, setProductFilmTitle] = useState('')
//     const [productFilmDesc, setProductFilmDesc] = useState('')
//     const [productFilmCost, setProductFilmCost] = useState('')
//     const [formError, setFormError] = useState(null)

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost) {
//             setFormError('Пожалуйста, заполните все поля')
//             return
//         }

//         // Загрузка файла и получение его имени
//         const fileInput = document.querySelector('input[type="file"]')
//         if (fileInput.files.length > 0) {
//             const file = fileInput.files[0]
//             const fileName = await uploadFile(file)
//             if (fileName) {
//                 // Если файл успешно загружен, добавляем данные в базу
//                 const { data, error } = await supabase.from('productFilm').insert([
//                     { productFilmTitle, productFilmDesc, productFilmCost, productImage: fileName }
//                 ]).select()

//                 if (error) {
//                     console.error(error)
//                     setFormError('Произошла ошибка при добавлении товара')
//                 } else {
//                     console.log(data)
//                     setFormError(null)
//                     navigate('/')
//                 }
//             } else {
//                 setFormError('Произошла ошибка при загрузке файла')
//             }
//         } else {
//             setFormError('Пожалуйста, выберите файл для загрузки')
//         }
//     }

//     // Загрузка файла в хранилище Supabase
//     async function uploadFile(file) {
//         const timestamp = Date.now(); // Временная метка для генерации уникального имени файла
//         const fileName = `${timestamp}_${file.name}`; // Добавляем временную метку к имени файла
//         const { data, error } = await supabase.storage.from('product_img').upload(fileName, file)
//         if (error) {
//             console.error(error)
//             return null
//         } else {
//             console.log('Файл успешно загружен')
//             return fileName
//         }
//     }

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productImage">Изображение товара:</label>
//                             <input type="file" id="productImage" />
//                         </div>

//                         <BaseBtn BtnText="Опубликовать" />

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [formError, setFormError] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost) {
//             setFormError('Пожалуйста, заполните все поля');
//             return;
//         }

//         const fileInput = document.querySelector('input[type="file"]');
//         if (fileInput.files.length > 0) {
//             const file = fileInput.files[0];
//             const fileName = await uploadFile(file);
//             if (fileName) {
//                 const { data, error } = await supabase.from('productFilm').insert([
//                     { 
//                         productFilmTitle, 
//                         product_film_desc: productFilmDesc, 
//                         product_film_cost: productFilmCost, 
//                         productImage: fileName 
//                     }
//                 ]).select();

//                 if (error) {
//                     console.error(error);
//                     setFormError('Произошла ошибка при добавлении товара');
//                 } else {
//                     console.log(data);
//                     setFormError(null);
//                     navigate('/');
//                 }
//             } else {
//                 setFormError('Произошла ошибка при загрузке файла');
//             }
//         } else {
//             setFormError('Пожалуйста, выберите файл для загрузки');
//         }
//     };

//     async function uploadFile(file) {
//         const fileName = `${file.name}_${Date.now()}`;
//         const { data, error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             return null;
//         } else {
//             console.log('Файл успешно загружен');
//             return fileName;
//         }
//     }

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productImage">Изображение товара:</label>
//                             <input type="file" id="productImage" />
//                         </div>

//                         <BaseBtn BtnText="Опубликовать" />

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [formError, setFormError] = useState(null);
//     const [productImageURL, setProductImageURL] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL) {
//             setFormError('Пожалуйста, заполните все поля и загрузите изображение');
//             return;
//         }

//         const { data, error } = await supabase.from('productFilm').insert([
//             { 
//                 productFilmTitle, 
//                 product_film_desc: productFilmDesc, 
//                 product_film_cost: productFilmCost, 
//                 productImage: productImageURL 
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при добавлении товара');
//         } else {
//             console.log(data);
//             setFormError(null);
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { data, error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при загрузке изображения');
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/product_img/${fileName}`);
//             setFormError(null);
//         }
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productImage">Изображение товара:</label>
//                             <input type="file" id="productImage" onChange={handleImageUpload} />
//                         </div>

//                         <BaseBtn BtnText="Опубликовать" />

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [formError, setFormError] = useState(null);
//     const [productImageURL, setProductImageURL] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL) {
//             setFormError('Пожалуйста, заполните все поля и загрузите изображение');
//             return;
//         }

//         const { data, error } = await supabase.from('productFilm').insert([
//             { 
//                 productFilmTitle, 
//                 product_film_desc: productFilmDesc, 
//                 product_film_cost: productFilmCost, 
//                 productImage: productImageURL 
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при добавлении товара');
//         } else {
//             console.log(data);
//             setFormError(null);
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { data, error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при загрузке изображения');
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/product_img/${fileName}`);
//             setFormError(null);
//         }
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productImage">Изображение товара:</label>
//                             <input type="file" id="productImage" onChange={handleImageUpload} />
//                         </div>

//                         <BaseBtn BtnText="Опубликовать" />

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// АВОЦАОЦВАОв РАБОЧИЙ

// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [formError, setFormError] = useState('');
//     const [productImageURL, setProductImageURL] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL) {
//             setFormError('Пожалуйста, заполните все поля и загрузите изображение');
//             return;
//         }

//         const { data, error } = await supabase.from('productFilm').insert([
//             { 
//                 productFilmTitle, 
//                 product_film_desc: productFilmDesc, 
//                 product_film_cost: productFilmCost, 
//                 productImage: productImageURL 
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при добавлении товара');
//         } else {
//             console.log(data);
//             setFormError('');
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { data, error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при загрузке изображения');
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
//             setFormError('');
//         }
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="productImage">Изображение товара:</label>
//                             <input type="file" id="productImage" onChange={handleImageUpload} />
//                         </div>

//                         <BaseBtn BtnText="Опубликовать" />

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [formError, setFormError] = useState('');
//     const [productImageURL, setProductImageURL] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Добавляем задержку в 100 миллисекунд перед проверкой формы
//         setTimeout(() => {
//             if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL) {
//                 setFormError('Пожалуйста, заполните все поля и загрузите изображение');
//                 return;
//             }

//             submitForm();
//         }, 100);
//     };

//     const submitForm = async () => {
//         const { data, error } = await supabase.from('productFilm').insert([
//             { 
//                 productFilmTitle, 
//                 product_film_desc: productFilmDesc, 
//                 product_film_cost: productFilmCost, 
//                 productImage: productImageURL 
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при добавлении товара');
//         } else {
//             console.log(data);
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError('Произошла ошибка при загрузке изображения');
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
//             setFormError('');
//         }
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label className='add-product__title'  htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                             <label className='add-product__desc'  htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                            <label className='add-product__desc'  htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                              <label className='add-product__desc'  htmlFor="productFilmTitle">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
//                         </div>

//                         <div className='file-input-container' >
//                             <label className='custom-file-input' htmlFor="productImage">Изображение товара:</label>
//                             <input className='custom-file-label' type="file" id="productImage" onChange={handleImageUpload} />
//                         </div>

//                         {/* <BaseBtn BtnText="Опубликовать" /> */}
//                         <div className="add-product__button">
//                          <BaseBtn BtnText="Опубликовать" />
//                         </div>

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;







// import React, { useState, useEffect } from 'react';


// import  { useState} from 'react';
// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co', 
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [formError, setFormError] = useState('');
//     const [productImageURL, setProductImageURL] = useState('');
//     const [isUploading, setIsUploading] = useState(false); // Track image uploading state

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL) {
//             setFormError(<p className="test">Произошла ошибка. Заполнитне все поля и добавьте изображение</p>);
//             return;
//         }

//         submitForm();
//     };

//     const submitForm = async () => {
//         const { data, error } = await supabase.from('productFilm').insert([
//             { 
//                 productFilmTitle, 
//                 product_film_desc: productFilmDesc, 
//                 product_film_cost: productFilmCost, 
//                 productImage: productImageURL 
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при добавлении товара</p>);
//         }else {
//             console.log(data);
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         setIsUploading(true); // Set uploading state to true when starting upload
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при загрузке изображения</p>);
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
//             setFormError('');
//         }
//         // After 3 seconds, reset uploading state
//         setTimeout(() => {
//             setIsUploading(false);
//         }, 3000);
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label className='add-product__title'  htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                             <label className='add-product__desc'  htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                            <label className='add-product__desc'  htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                              <label className='add-product__desc'  htmlFor="productFilmTitle">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
//                         </div>

//                     <div className='file-input-container'>
//                         <label className='custom-file-button' htmlFor="productImage">
//                             Выберите файл
//                         </label>
//                         <input className='custom-file-input' type="file" id="productImage" onChange={handleImageUpload} />
//                         {isUploading && <img className="preload-gif" src="/preload.gif" alt="Загрузка..."  />}
//                         <span className={`file-selected-text ${productImageURL ? 'selected' : 'not-selected'}`}>
//                             {productImageURL ? 'Изображение выбрано' : 'Нет выбранного файла'}
//                         </span>

//                     </div>

//                         <div className="add-product__button">
//                             <BaseBtn BtnText="Опубликовать" />
//                         </div>

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// import React, { useState } from 'react';
// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [productFilmCategory, setProductFilmCategory] = useState('');
//     const [formError, setFormError] = useState('');
//     const [productImageURL, setProductImageURL] = useState('');
//     const [isUploading, setIsUploading] = useState(false); // Track image uploading state

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL || !productFilmCategory) {
//             setFormError(<p className="test">Произошла ошибка. Заполните все поля и добавьте изображение</p>);
//             return;
//         }

//         submitForm();
//     };

//     const submitForm = async () => {
//         const { data, error } = await supabase.from('productFilm').insert([
//             {
//                 productFilmTitle,
//                 product_film_desc: productFilmDesc,
//                 product_film_cost: productFilmCost,
//                 product_film_category: productFilmCategory,
//                 productImage: productImageURL
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при добавлении товара</p>);
//         } else {
//             console.log(data);
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         setIsUploading(true); // Set uploading state to true when starting upload
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при загрузке изображения</p>);
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
//             setFormError('');
//         }
//         // After 3 seconds, reset uploading state
//         setTimeout(() => {
//             setIsUploading(false);
//         }, 3000);
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>
                        

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCategory">Категория:</label>
//                             <select
//                                 id='productFilmCategory'
//                                 value={productFilmCategory}
//                                 onChange={(e) => setProductFilmCategory(e.target.value)}
//                             >
//                                 <option value="">Выберите категорию</option>
//                                 <option value="Кино">Кино</option>
//                                 <option value="Игры">Игры</option>
//                                 <option value="Аудио Книги">Аудио Книги</option>
//                                 <option value="Электронные книги">Электронные книги</option>
//                             </select>
//                         </div>


//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCategory">Выбрать изображение:</label>
//                             <div className='file-input-container'>
//                                 <label className='custom-file-button' htmlFor="productImage">
//                                     Выберите файл
//                                 </label>
//                                 <input className='custom-file-input' type="file" id="productImage" onChange={handleImageUpload} />
//                                 {isUploading && <img className="preload-gif" src="/preload.gif" alt="Загрузка..." />}
//                                 <span className={`file-selected-text ${productImageURL ? 'selected' : 'not-selected'}`}>
//                                     {productImageURL ? 'Изображение выбрано' : 'Нет выбранного файла'}
//                                 </span>
//                             </div>
//                         </div>
                        

//                         <div className="add-product__button">
//                             <BaseBtn BtnText="Опубликовать" />
//                         </div>

//                         {formError && <p className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;



// import React, { useState } from 'react';
// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss';
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [productFilmCategory, setProductFilmCategory] = useState('');
//     const [formError, setFormError] = useState('');
//     const [productImageURL, setProductImageURL] = useState('');
//     const [isUploading, setIsUploading] = useState(false); // Track image uploading state

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL || !productFilmCategory) {
//             setFormError(<p className="test">Произошла ошибка. Заполните все поля и добавьте изображение</p>);
//             scrollToError();
//             return;
//         }

//         submitForm();
//     };

//     const scrollToError = () => {
//         const errorElement = document.getElementById('form-error');
//         errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     };

//     const submitForm = async () => {
//         const { data, error } = await supabase.from('productFilm').insert([
//             {
//                 productFilmTitle,
//                 product_film_desc: productFilmDesc,
//                 product_film_cost: productFilmCost,
//                 product_film_category: productFilmCategory,
//                 productImage: productImageURL
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при добавлении товара</p>);
//             scrollToError();
//         } else {
//             console.log(data);
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         setIsUploading(true); // Set uploading state to true when starting upload
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при загрузке изображения</p>);
//             scrollToError();
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
//             setFormError('');
//         }
//         // After 3 seconds, reset uploading state
//         setTimeout(() => {
//             setIsUploading(false);
//         }, 3000);
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>
                        

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCategory">Категория:</label>
//                             <select
//                                 id='productFilmCategory'
//                                 value={productFilmCategory}
//                                 onChange={(e) => setProductFilmCategory(e.target.value)}
//                             >
//                                 <option value="">Выберите категорию</option>
//                                 <option value="Кино">Кино</option>
//                                 <option value="Игры">Игры</option>
//                                 <option value="Аудио Книги">Аудио Книги</option>
//                                 <option value="Электронные книги">Электронные книги</option>
//                             </select>
//                         </div>


//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCategory">Выбрать изображение:</label>
//                             <div className='file-input-container'>
//                                 <label className='custom-file-button' htmlFor="productImage">
//                                     Выберите файл
//                                 </label>
//                                 <input className='custom-file-input' type="file" id="productImage" onChange={handleImageUpload} />
//                                 {isUploading && <img className="preload-gif" src="/preload.gif" alt="Загрузка..." />}
//                                 <span className={`file-selected-text ${productImageURL ? 'selected' : 'not-selected'}`}>
//                                     {productImageURL ? 'Изображение выбрано' : 'Нет выбранного файла'}
//                                 </span>
//                             </div>
//                         </div>
                        

//                         <div className="add-product__button">
//                             <BaseBtn BtnText="Опубликовать" />
//                         </div>

//                         {formError && <p id="form-error" className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


// // import React, { useState } from 'react';
// import  { useState } from 'react';
// import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
// import './AddProduct.scss'; // Подключаем стили
// import { useNavigate } from 'react-router-dom';
// import { createClient } from '@supabase/supabase-js';

// const AddProduct = () => {
//     const supabase = createClient(
//         'https://poprpfzqyzbmsbhtvvjw.supabase.co',
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
//     );

//     const navigate = useNavigate();

//     const [productFilmTitle, setProductFilmTitle] = useState('');
//     const [productFilmDesc, setProductFilmDesc] = useState('');
//     const [productFilmCost, setProductFilmCost] = useState('');
//     const [productFilmCategory, setProductFilmCategory] = useState('');
//     const [formError, setFormError] = useState('');
//     const [productImageURL, setProductImageURL] = useState('');
//     const [isUploading, setIsUploading] = useState(false); // Track image uploading state

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL || !productFilmCategory) {
//             setFormError(<p className="test">Произошла ошибка. Заполните все поля и добавьте изображение</p>);
//             scrollToError();
//             return;
//         }

//         submitForm();
//     };

//     const scrollToError = () => {
//         const errorElement = document.getElementById('form-error');
//         errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     };

//     const submitForm = async () => {
//         const { data, error } = await supabase.from('productFilm').insert([
//             {
//                 productFilmTitle,
//                 product_film_desc: productFilmDesc,
//                 product_film_cost: productFilmCost,
//                 product_film_category: productFilmCategory,
//                 productImage: productImageURL
//             }
//         ]).select();

//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при добавлении товара</p>);
//             scrollToError();
//         } else {
//             console.log(data);
//             navigate('/');
//         }
//     };

//     const handleImageUpload = async (e) => {
//         setIsUploading(true); // Set uploading state to true when starting upload
//         const file = e.target.files[0];
//         const fileName = `${file.name}_${Date.now()}`;
//         const { error } = await supabase.storage.from('product_img').upload(fileName, file);
//         if (error) {
//             console.error(error);
//             setFormError(<p className="test">Произошла ошибка при загрузке изображения</p>);
//             scrollToError();
//         } else {
//             console.log('Файл успешно загружен');
//             setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
//             setFormError('');
//         }
//         // After 3 seconds, reset uploading state
//         setTimeout(() => {
//             setIsUploading(false);
//         }, 3000);
//     };

//     return (
//         <>
//             <div className="first-element"></div>
//             <section className="add-product">
//                 <div className="container">
//                     <form onSubmit={handleSubmit} className="add-product-wrapper">
//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmTitle">Название:</label>
//                             <input
//                                 type="text"
//                                 id='productFilmTitle'
//                                 value={productFilmTitle}
//                                 onChange={(e) => setProductFilmTitle(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
//                             <textarea
//                                 type="text"
//                                 id='productFilmDesc'
//                                 value={productFilmDesc}
//                                 onChange={(e) => setProductFilmDesc(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
//                         </div>
                        
//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
//                             <input
//                                 type="number"
//                                 id='productFilmCost'
//                                 value={productFilmCost}
//                                 onChange={(e) => setProductFilmCost(e.target.value)}
//                             />
//                             <label className='add-product__desc' htmlFor="productFilmTitle">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCategory">Категория:</label>
//                             <div className='add-product__select__container' >  
//                             <select
//                                 id='productFilmCategory'
//                                 className='add-product__select'
//                                 value={productFilmCategory}
//                                 onChange={(e) => setProductFilmCategory(e.target.value)}
//                             >
//                                 <option value="">Выберите категорию</option>
//                                 <option value="Кино">Кино</option>
//                                 <option value="Игры">Игры</option>
//                                 <option value="Аудио Книги">Аудио Книги</option>
//                                 <option value="Электронные книги">Электронные книги</option>
//                             </select>
//                             </div>
//                         </div>

//                         <div>
//                             <label className='add-product__title' htmlFor="productFilmCategory">Выбрать изображение:</label>
//                             <div className='file-input-container'>
//                                 <label className='custom-file-button' htmlFor="productImage">
//                                     Выберите файл
//                                 </label>
//                                 <input className='custom-file-input' type="file" id="productImage" onChange={handleImageUpload} />
//                                 {isUploading && <img className="preload-gif" src="/preload.gif" alt="Загрузка..." />}
//                                 <span className={`file-selected-text ${productImageURL ? 'selected' : 'not-selected'}`}>
//                                     {productImageURL ? 'Изображение выбрано' : 'Нет выбранного файла'}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="add-product__button">
//                             <BaseBtn BtnText="Опубликовать" />
//                         </div>

//                         {formError && <p id="form-error" className='error'>{formError}</p>}
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default AddProduct;


import  { useState } from 'react';
import BaseBtn from '../../Components/Base/BaseBtn/BaseBtn';
import './AddProduct.scss'; // Подключаем стили
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { PATHS } from '../../../router'

const AddProduct = () => {
    const supabase = createClient(
        'https://poprpfzqyzbmsbhtvvjw.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
    );

    const navigate = useNavigate();

    const [productFilmTitle, setProductFilmTitle] = useState('');
    const [productFilmDesc, setProductFilmDesc] = useState('');
    const [productFilmCost, setProductFilmCost] = useState('');
    const [productFilmCategory, setProductFilmCategory] = useState('');
    const [productFilmKey, setProductFilmKey] = useState(''); // Новое состояние для ключа товара
    const [formError, setFormError] = useState('');
    const [productImageURL, setProductImageURL] = useState('');
    const [isUploading, setIsUploading] = useState(false); // Track image uploading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productFilmTitle || !productFilmDesc || !productFilmCost || !productImageURL || !productFilmCategory || !productFilmKey) { // Обновлено: добавлено условие для проверки наличия ключа товара
            setFormError(<p className="test">Произошла ошибка. Заполните все поля и добавьте изображение и ключ товара</p>);
            scrollToError();
            return;
        }

        submitForm();
    };

    const scrollToError = () => {
        const errorElement = document.getElementById('form-error');
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const submitForm = async () => {
        const { data, error } = await supabase.from('productFilm').insert([
            {
                productFilmTitle,
                product_film_desc: productFilmDesc,
                product_film_cost: productFilmCost,
                product_film_category: productFilmCategory,
                product_film_key: productFilmKey, // Обновлено: добавлено поле для ключа товара
                productImage: productImageURL
            }
        ]).select();

        if (error) {
            console.error(error);
            setFormError(<p className="test">Произошла ошибка при добавлении товара</p>);
            scrollToError();
        } else {
            console.log(data);
            navigate(PATHS.HOME);
        }
    };

    const handleImageUpload = async (e) => {
        setIsUploading(true); // Set uploading state to true when starting upload
        const file = e.target.files[0];
        const fileName = `${file.name}_${Date.now()}`;
        const { error } = await supabase.storage.from('product_img').upload(fileName, file);
        if (error) {
            console.error(error);
            setFormError(<p className="test">Произошла ошибка при загрузке изображения</p>);
            scrollToError();
        } else {
            console.log('Файл успешно загружен');
            setProductImageURL(`https://poprpfzqyzbmsbhtvvjw.supabase.co/storage/v1/object/public/product_img/${fileName}`);
            setFormError('');
        }
        // After 3 seconds, reset uploading state
        setTimeout(() => {
            setIsUploading(false);
        }, 3000);
    };

    return (
        <>
            <div className="first-element"></div>
            <section className="add-product">
                <div className="container">
                    <form onSubmit={handleSubmit} className="add-product-wrapper">
                        <div>
                            <label className='add-product__title' htmlFor="productFilmTitle">Название:</label>
                            <input
                                type="text"
                                id='productFilmTitle'
                                value={productFilmTitle}
                                onChange={(e) => setProductFilmTitle(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmDesc">Описание:</label>
                            <textarea
                                type="text"
                                id='productFilmDesc'
                                value={productFilmDesc}
                                onChange={(e) => setProductFilmDesc(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmTitle">В карточке товара на главной, будет корректно отображаться только первые 30 символов</label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmKey">Ключ от товара:</label>
                            <input
                                type="text"
                                id='productFilmKey'
                                value={productFilmKey}
                                onChange={(e) => setProductFilmKey(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmKey">Покупатель должен вписать код от своего продукта</label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmCost">Цена:</label>
                            <input
                                type="number"
                                id='productFilmCost'
                                value={productFilmCost}
                                onChange={(e) => setProductFilmCost(e.target.value)}
                            />
                            <label className='add-product__desc' htmlFor="productFilmTitle">Цена в рублях, только цифры. Значок ₽ автоматический будет отображаться в карточке товара</label>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmCategory">Категория:</label>
                            <div className='add-product__select__container' >  
                            <select
                                id='productFilmCategory'
                                className='add-product__select'
                                value={productFilmCategory}
                                onChange={(e) => setProductFilmCategory(e.target.value)}
                            >
                                <option value="">Выберите категорию</option>
                                <option value="Кино">Кино</option>
                                <option value="Игры">Игры</option>
                                <option value="Аудио Книги">Аудио Книги</option>
                                <option value="Электронные книги">Электронные книги</option>
                            </select>
                            </div>
                        </div>

                        <div>
                            <label className='add-product__title' htmlFor="productFilmCategory">Выбрать изображение:</label>
                            <div className='file-input-container'>
                                <label className='custom-file-button' htmlFor="productImage">
                                    Выберите файл
                                </label>
                                <input className='custom-file-input' type="file" id="productImage" onChange={handleImageUpload} />
                                {isUploading && <img className="preload-gif" src="/preload.gif" alt="Загрузка..." />}
                                <span className={`file-selected-text ${productImageURL ? 'selected' : 'not-selected'}`}>
                                    {productImageURL ? 'Изображение выбрано' : 'Нет выбранного файла'}
                                </span>
                            </div>
                        </div>

                        <div className="add-product__button">
                            <BaseBtn BtnText="Опубликовать" />
                        </div>

                        {formError && <p id="form-error" className='error'>{formError}</p>}
                    </form>
                </div>
            </section>
        </>
    );
}

export default AddProduct;
