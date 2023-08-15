const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');
const { OK_CODE } = require('../utils/constants');
const Movie = require('../models/movie');

const {
  INCORRECT_DATA_MESSAGE,
  MOVIE_REMOVAL_DENIED_MESSAGE,
  INCORRECT_MOVIEID_MESSAGE,
} = require('../errors/errorMessage');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};
const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((newMovie) => res.status(OK_CODE).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_MESSAGE));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError(INCORRECT_MOVIEID_MESSAGE);
      } else if (!(req.user._id === data.owner.toString())) {
        throw new ForbiddenError(MOVIE_REMOVAL_DENIED_MESSAGE);
      }
      return Movie.deleteOne({ _id: data._id }).then(() => {
        res.send(data);
      });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
