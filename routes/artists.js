'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/artists', (req, res, next) => {
  knex('artists')
    .orderBy('id')
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
