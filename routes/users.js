'use strict';

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 12, (err, hashed_password) => {
    if (err) {
      return next(err);
    }

    console.log(req.body.email, hashed_password);
    res.sendStatus(200);
  });
});

module.exports = router;
