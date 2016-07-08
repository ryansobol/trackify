'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ silent: true });
}

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const artists = require('./routes/artists');
const tracks = require('./routes/tracks');
const users = require('./routes/users');
const session = require('./routes/session');

const app = express();

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieSession({
  name: 'trackify_session',
  secret: process.env.SESSION_SECRET
}));

app.use(express.static(path.join('public')));

app.use(artists);
app.use(tracks);
app.use(users);
app.use(session);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send(err);
  }

  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
