const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.hello = functions.https.onRequest((req, res) => {
  const name = req.query.name;
  res.send(`Hello ${name}!!`)
});

exports.addMessage = functions.https.onRequest((req, res) => {
  const original = req.query.text;
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    return res.redirect(303, snapshot.ref.toString());
  });
});
