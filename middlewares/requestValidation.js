const { celebrate, Joi } = require('celebrate');
// const { RegExp } = require('../utils/constants');
const validator = require('validator');

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const profileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (!validator.isURL(value)) {
        return helpers.message('Invalid URL format');
      }
      return value;
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (!validator.isURL(value)) {
        return helpers.message('Invalid URL format');
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (!validator.isURL(value)) {
        return helpers.message('Invalid URL format');
      }
      return value;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
// const movieValidation = celebrate({
//   body: Joi.object().keys({
//     country: Joi.string().required(),
//     director: Joi.string().required(),
//     duration: Joi.number().required(),
//     year: Joi.string().required(),
//     description: Joi.string().required(),
//     trailerLink: Joi.string().required().regex(RegExp.URL),
//     image: Joi.string().required().regex(RegExp.URL),
//     thumbnail: Joi.string().required().regex(RegExp.URL),
//     movieId: Joi.number().required(),
//     nameRU: Joi.string().required(),
//     nameEN: Joi.string().required(),
//   }),
// });

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  userValidation,
  profileValidation,
  loginValidation,
  movieValidation,
  movieIdValidation,
};
