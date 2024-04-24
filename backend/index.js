// const express = require('express');
// const { YooCheckout } = require('@a2seven/yoo-checkout');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const checkout = new YooCheckout({ shopId: '368818', secretKey: 'test_OZhXOgfYUJBLSE3oSZZVKF_FkurWzHlaxdFIcMq3q0g' });

// app.listen(PORT, () => {
//     console.log(`Server start ${PORT}`);
// });

// app.use(express.json());

// // Маршрут для создания платежа
// app.post('/create-payment', async (req, res) => {
//     const idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a5';

//     const createPayload = {
//         amount: {
//             value: '2.00',
//             currency: 'RUB'
//         },
//         payment_method_data: {
//             type: 'bank_card'
//         },
//         confirmation: {
//             type: 'redirect',
//             return_url: 'test'
//         }
//     };

//     try {
//         const payment = await checkout.createPayment(createPayload, idempotenceKey);
//         res.json(payment);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create payment' });
//     }
// });

// app.get('/', (req, res) => {
//     res.json({
//         message: "hello from server + express"
//     });
// });

// fwdfed




// const express = require('express');
// const { YooCheckout } = require('@a2seven/yoo-checkout');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const checkout = new YooCheckout({ shopId: '368818', secretKey: 'test_OZhXOgfYUJBLSE3oSZZVKF_FkurWzHlaxdFIcMq3q0g' });

// app.listen(PORT, () => {
//     console.log(`Server start ${PORT}`);
// });

// app.use(express.json());

// // Маршрут для создания платежа
// app.post('/create-payment', async (req, res) => {
//     const idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a51';
//     // const idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a5';

//     const createPayload = {
//         amount: {
//             value: '2.00',
//             currency: 'RUB'
//         },
//         payment_method_data: {
//             type: 'bank_card'
//         },
//         confirmation: {
//             type: 'redirect',
//             return_url: 'test'
//         }
//     };

//     try {
//         const payment = await checkout.createPayment(createPayload, idempotenceKey);
//         // Получаем URL оплаты из созданного платежа
//         const paymentUrl = payment.confirmation.confirmation_url;
//         // Отправляем URL оплаты в ответе
//         res.json({ paymentUrl });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create payment' });
//     }
// });

// app.get('/', (req, res) => {
//     res.json({
//         message: "hello from server + express"
//     });
// });


const express = require('express');
const { YooCheckout } = require('@a2seven/yoo-checkout');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const checkout = new YooCheckout({ shopId: '368818', secretKey: 'test_OZhXOgfYUJBLSE3oSZZVKF_FkurWzHlaxdFIcMq3q0g' });

app.use(cors()); // Разрешаем все запросы CORS

app.listen(PORT, () => {
    console.log(`Server start ${PORT}`);
});

app.use(express.json());

// Маршрут для создания платежа
app.post('/create-payment', async (req, res) => {
    const idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a51';

    const createPayload = {
        amount: {
            value: '2.00',
            currency: 'RUB'
        },
        payment_method_data: {
            type: 'bank_card'
        },
        confirmation: {
            type: 'redirect',
            return_url: 'test'
        }
    };

    try {
        const payment = await checkout.createPayment(createPayload, idempotenceKey);
        const paymentUrl = payment.confirmation.confirmation_url;
        res.json({ paymentUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});
