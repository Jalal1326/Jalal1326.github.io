const paypal = require('@paypal/checkout-server-sdk');

// Set up PayPal environment
function environment() {
    const clientId = 'AT5C6rg1Lvhcjq_6Bsn3977TaFtp0hhG_RnkdZbhh0dMV-oep5hoa13_5zVfNdaL4_xG3XsVcZF-n_zL'; // Replace with your Client ID
    const clientSecret = 'EHvFEYnSoeH3uoDKyU2j3hKWYtxScsXi_z98zSJYVdOlwPVbGrKdDIyLJuvjr91E9OvM21hsLRt1Yq8V'; // Replace with your Client Secret
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

// Create PayPal client
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

// Create Payment Route
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