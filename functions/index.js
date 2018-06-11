const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.sk_test);

exports.hello = functions.https.onRequest((req, res) => {
  const name = req.query.name;
  res.send(`Hello ${name}!!`)
});

exports.c_card = functions.https.onRequest((req, res) => {
  const number = req.body.number;
  const exp_month = req.body.exp_month;
  const exp_year = req.body.exp_year;
  const cvc = req.body.cvc;

  stripe.tokens.create({
    card: {
      number,
      exp_month,
      exp_year,
      cvc,
    }
  }, (err, token) => {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(token)
    }
  });
});
