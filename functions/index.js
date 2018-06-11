const functions = require('firebase-functions');

exports.hello = functions.https.onRequest((req, res) => {
  const name = req.query.name;
  res.send(`Hello ${name}!!`)
});

exports.c_card = functions.https.onRequest((req, res) => {
  const stripe = require('stripe')(functions.config().stripe.sk_test);
  stripe.tokens.create({
    card: {
      "number": '4242424242424242',
      "exp_month": 12,
      "exp_year": 2019,
      "cvc": '123'
    }
  }, (err, token) => {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(token)
    }
  });
});
