export default {
    routes: [
        {
            method: "POST",
            path: "/orders/create-payment-intent",
            handler: "order.createPaymentIntent",
        },
    ],
};