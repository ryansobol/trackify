'use strict';

const Joi = require('joi');

module.exports.users = {
  body: {
    email: Joi.string()
      .email()
      .min(3)
      .max(63)
      .label('Email')
      .trim()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      // .alphaNum()
      // .min(3)
      // .max(30)
      .label('Password')
      .trim()
      .required()
  }
};

module.exports.artists = {
  body: {
    name: Joi.string()
      .max(63)
      .label('Artist name')
      .trim()
      .required()
  }
};
