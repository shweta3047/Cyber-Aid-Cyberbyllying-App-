const functions = require('firebase-functions');

const express = require('express');

const PORT = 3000;
const app = express();
app.use(express.json({extended: false}));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', ['*']);
  next();
});
app.use('/api/detect', require('./routes/api/profanity'));
//app.use('/api/fitness',require('./routes/api/fitness'))

app.listen = function () {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

exports.app = functions.https.onRequest(app);
\
