const express = require('express');
const { YooCheckout } = require('@a2seven/yoo-checkout');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Инициализация клиента Supabase
const supabase = createClient(
    'https://poprpfzqyzbmsbhtvvjw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcHJwZnpxeXpibXNiaHR2dmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MDYzMTEsImV4cCI6MjAyNzI4MjMxMX0.wMh3igzPTekhCkRSWyknGW2YEJII8JJH_8PvYnu3hXo'
);

// Инициализация YooCheckout
const checkout = new YooCheckout({ 
    shopId: '368818', 
    secretKey: 'test_OZhXOgfYUJBLSE3oSZZVKF_FkurWzHlaxdFIcMq3q0g' 
});

app.use(cors());
app.use(express.json());

// Механизм блокировки для обработки только одного платежа одновременно
let isProcessingPayment = false;

// Список обработанных orderId для предотвращения дубликатов
const processedOrders = new Set();

// Маршрут для создания платежа
app.post('/create-payment', async (req, res) => {
    const idempotenceKey = uuidv4();
    const orderId = uuidv4(); // Generate orderId
    const { productName, price, userEmail, product_id, product_img, product_film_key } = req.body;

    console.log('Received data:', { productName, price, userEmail, product_id, product_img, product_film_key });

    try {
        const createPayload = {
            amount: {
                value: price,
                currency: 'RUB'
            },
            payment_method_data: {
                type: 'bank_card',
                id: req.body.payment_method_id
            },
            confirmation: {
                type: 'redirect',
                return_url: `http://localhost:3001/payment-success?userEmail=${encodeURIComponent(userEmail)}&productName=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&product_id=${encodeURIComponent(product_id)}&product_img=${encodeURIComponent(product_img)}&product_film_key=${encodeURIComponent(product_film_key)}&orderId=${encodeURIComponent(orderId)}`
            },
            description: `Product Name: \n${productName}`,
            metadata: {
                product_name: productName
            }
        };

        const payment = await checkout.createPayment(createPayload, idempotenceKey);
        const paymentUrl = payment.confirmation.confirmation_url;

        console.log('Payment created successfully:', payment);

        res.json({ paymentUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating payment' });
    }
});

// Маршрут для обработки успешного платежа
app.get('/payment-success', async (req, res) => {
    try {
        const orderId = req.query.orderId;
        const userEmail = req.query.userEmail;

        if (isProcessingPayment) {
            // Если уже обрабатывается платеж, возвращаем ошибку
            return res.status(400).send(`
                <html>
                    <head>
                        <title>Платеж</title>
                    </head>
                    <body style="text-align: center; border: 3px solid rgb(25, 130, 250); padding: 20px; border-radius: 10px; max-width: 330px; max-height: 300px; margin: 0 auto; margin-top: 100px; font-size: 25px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%;">
                        <h2>Платеж обрабатывается</h2>
                        <button style="margin-top: 20px; border: none; background: rgb(25, 130, 250); color: #fff; padding: 10px 20px; cursor: pointer; width: 90%; font-size: 22px; border-radius: 5px;" onclick="window.location.href='http://localhost:3000'">На главную</button>
                    </body>
                </html>
            `);
        }

        if (processedOrders.has(orderId)) {
            // Если этот orderId уже был обработан, возвращаем сообщение об ошибке
            return res.status(400).send(`
                <html>
                    <head>
                        <title>Ошибка!</title>
                    </head>
                    <body style="text-align: center; border: 3px solid rgb(25, 130, 250); padding: 20px; border-radius: 10px; max-width: 330px; max-height: 300px; margin: 0 auto; margin-top: 100px; font-size: 25px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%;">
                        <h2>Платеж уже обработан</h2>
                        <button style="margin-top: 20px; border: none; background: rgb(25, 130, 250); color: #fff; padding: 10px 20px; cursor: pointer; width: 90%; font-size: 22px; border-radius: 5px;" onclick="window.location.href='http://localhost:3000'">На главную</button>
                    </body>
                </html>
            `);
        }

        // Устанавливаем флаг обработки платежа
        isProcessingPayment = true;

        // Проверяем, существует ли уже запись с таким orderId и userEmail
        const { data: existingOrder, error: queryError } = await supabase
            .from('orders')
            .select('*')
            .eq('order_id', orderId)
            .eq('user_email', userEmail);

        if (queryError) {
            throw new Error('Error querying orders table');
        }

        // Если уже существует запись с таким orderId и userEmail, завершаем обработку
        if (existingOrder.length > 0) {
            isProcessingPayment = false;
            return res.status(200).send(`
                <html>
                    <head>
                        <title>Платеж</title>
                    </head>
                    <body style="text-align: center; border: 3px solid rgb(25, 130, 250); padding: 20px; border-radius: 10px; max-width: 330px; max-height: 300px; margin: 0 auto; margin-top: 100px; font-size: 25px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%;">
                        <h2>Платеж успешно обработан</h2>
                        <button style="margin-top: 20px; border: none; background: rgb(25, 130, 250); color: #fff; padding: 10px 20px; cursor: pointer; width: 90%; font-size: 22px; border-radius: 5px;" onclick="window.location.href='http://localhost:3000'">На главную</button>
                    </body>
                </html>
            `);
        }

        // Вставляем новую запись, только если запись с orderId и userEmail не существует
        const { data: insertedOrder, error: insertError } = await supabase.from('orders').insert({
            user_email: userEmail,
            product_name: req.query.productName,
            total_price: req.query.price,
            product_id: req.query.product_id,
            product_img: req.query.product_img,
            order_key: req.query.product_film_key,
            order_id: orderId
        });

        if (insertError) {
            throw new Error('Error creating record in orders table');
        }

        // Добавляем orderId в список обработанных
        processedOrders.add(orderId);

        // Задержка перед разблокировкой обработки следующего платежа (в данном случае 7 секунд)
        setTimeout(() => {
            isProcessingPayment = false;
            processedOrders.delete(orderId);
        }, 7000);

        res.status(200).send(`
            <html>
                <head>
                    <title>Успех!</title>
                </head>
                <body style="text-align: center; border: 3px solid rgb(25, 130, 250); padding: 20px; border-radius: 10px; max-width: 330px; max-height: 300px; margin: 0 auto; margin-top: 100px; font-size: 25px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; height: 100%;">
                    <h2>Платеж успешно завершен</h2>
                    <button style="margin-top: 20px; border: none; background: rgb(25, 130, 250); color: #fff; padding: 10px 20px; cursor: pointer; width: 90%; font-size: 22px; border-radius: 5px;" onclick="window.location.href='http://localhost:3000'">На главную</button>
                </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing successful payment' });
    }
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
