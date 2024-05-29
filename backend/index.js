const express = require('express');
const { YooCheckout } = require('@a2seven/yoo-checkout');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser'); // Импорт модуля body-parser

const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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

// Директория с HTML-шаблонами
const htmlDir = path.join(__dirname, 'html');

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
            const processingHtml = await fs.readFile(path.join(htmlDir, 'payment-processing.html'), 'utf8');
            return res.status(400).send(processingHtml);
        }

        if (processedOrders.has(orderId)) {
            const alreadyProcessedHtml = await fs.readFile(path.join(htmlDir, 'payment-already-processed.html'), 'utf8');
            return res.status(400).send(alreadyProcessedHtml);
        }

        isProcessingPayment = true;

        const { data: product, error: productError } = await supabase
            .from('productFilm')
            .select('*')
            .eq('id', req.query.product_id)
            .single();

        if (productError) {
            throw new Error('Error querying productFilm table');
        }

        if (!product) {
            throw new Error('Product not found');
        }

        const { error: updateError } = await supabase
            .from('productFilm')
            .update({ product_film_buyed: 'buyed' })
            .eq('id', req.query.product_id);

        if (updateError) {
            throw new Error('Error updating productFilm table');
        }

        // Добавление информации о заказе в таблицу orders
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

        processedOrders.add(orderId);

        setTimeout(() => {
            isProcessingPayment = false;
            processedOrders.delete(orderId);
        }, 7000);

        // Отправка страницы с сообщением об успешной оплате
        const successHtml = await fs.readFile(path.join(htmlDir, 'payment-success.html'), 'utf8');
        return res.status(200).send(successHtml);
    } catch (error) {
        console.error(error);
        const processingHtml = await fs.readFile(path.join(htmlDir, 'payment-processing.html'), 'utf8');
        return res.status(400).send(processingHtml);
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
