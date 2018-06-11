const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.sk_test);

exports.c_customer = functions.https.onRequest((req, res) => {
  const number = req.body.number;
  const exp_month = req.body.exp_month;
  const exp_year = req.body.exp_year;
  const cvc = req.body.cvc;

  stripe.customers.create({
    description: 'Customer for mason.jackson@example.com',
    email: 'example@co.jp',
    source: {
      object: 'card',
      currency: 'jpy',
      number,
      exp_month,
      exp_year,
      cvc,
    },
  }).then(customer => {
    res.send(customer);
  }).catch(err => {
    res.send(err);
  });
});
