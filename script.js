paypal.Buttons({

    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '10.00' 
                }
            }]
        });
    },


    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {

            alert('Transaction completed by ' + details.payer.name.given_name);
            console.log('Transaction details:', details);
        });
    },


    onError: function(err) {
        console.error('PayPal error:', err);
        alert('An error occurred during the payment process. Please try again.');
    }
}).render('#paypal-button-container'); 

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/search', (req, res) => {
    const query = req.body.query;

    res.json({ message: `You searched for: ${query}` });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crud-app', { useNewUrlParser: true, useUnifiedTopology: true });