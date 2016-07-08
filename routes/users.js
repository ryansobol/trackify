'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt');
const ev = require('express-validation');
const validations = require('../validations/users');

const checkAuth = function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  next();
};

router.get('/users/artists', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;

  knex('artists')
    .innerJoin('users_artists', 'users_artists.artist_id', 'artists.id')
    .where('users_artists.user_id', userId)
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users/artists/:artistId', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;
  const artistId = Number.parseInt(req.params.artistId);

  knex('users_artists')
    .insert({
      user_id: userId,
      artist_id: artistId
    }, '*')
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', ev(validations.post), (req, res, next) => {
  bcrypt.hash(req.body.password, 12, (hashErr, hashed_password) => {
    if (hashErr) {
      return next(hashErr);
    }

    knex('users')
      .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        hashed_password: hashed_password
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        next(err);
      });
  });
});

module.exports = router;
