'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../knex');
const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 12, (hashErr, hashed_password) => {
    if (hashErr) {
      return next(hashErr);
    }

    knex('users')
      .insert({
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
