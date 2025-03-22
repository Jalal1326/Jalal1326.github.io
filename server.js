const paypal = require('@paypal/checkout-server-sdk');


function environment() {
    const clientId = 'AYa2JPyRtdks9rMyaPezmW_zEbwUjYWN_O0pFFrWnIWuOqjxDisVaTilrYcSjjUY1euhSxS38iZHVN_p'; // Replace with your Client ID
    const clientSecret = 'EHvFEYnSoeH3uoDKyU2j3hKWYtxScsXi_z98zSJYVdOlwPVbGrKdDIyLJuvjr91E9OvM21hsLRt1Yq8V'; // Replace with your Client Secret
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}


function client() {
    return new paypal.core.PayPalHttpClient(environment());
}


app.post('/create-payment', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '10.00',
            },
        }],
    });

    try {
        const response = await client().execute(request);
        res.json({ orderID: response.result.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});