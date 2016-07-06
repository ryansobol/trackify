'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const ev = require('express-validation');
const validations = require('../validations/schema');

router.get('/artists', (_req, res, next) => {
  knex('artists')
    .orderBy('id')
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/artists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      res.send(artist);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/artists', ev(validations.artists), (req, res, next) => {
  knex('artists')
    .insert(req.body, '*')
    .then((artists) => {
      res.send(artists[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/artists/:id', (req, res, next) => {
  knex('artists')
    .update(req.body, '*')
    .where('id', req.params.id)
    .then((artists) => {
      res.send(artists[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/artists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {

      return knex('artists')
        .del()
        .where('id', req.params.id)
        .then(() => {
          delete artist.id;
          res.send(artist);
        });

    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
