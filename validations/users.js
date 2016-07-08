'use strict';

const Joi = require('joi');

module.exports.post = {
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
      .label('Password')
      .trim()
      .required()
  }
};
