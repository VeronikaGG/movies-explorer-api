const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { OK_CODE } = require('../utils/constants');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const AuthorizationError = require('../errors/authorizationError');
const { NODE_ENV, JWT_SECRET } = require('../utils/constants');

const {
  INCORRECT_USERID_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  INCORRECT_EMAIL_PASSWORD_MESSAGE,
} = require('../errors/errorMessage');

const getUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(INCORRECT_USERID_MESSAGE);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    owner,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(INCORRECT_USERID_MESSAGE);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(CONFLICT_ERROR_MESSAGE),
        );
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_MESSAGE));
        return;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      res.status(OK_CODE).send({
        email: newUser.email,
        name: newUser.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError(CONFLICT_ERROR_MESSAGE),
        );
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(INCORRECT_EMAIL_PASSWORD_MESSAGE);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError(INCORRECT_EMAIL_PASSWORD_MESSAGE);
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
          expiresIn: '7d',
        });
        res.send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
};
