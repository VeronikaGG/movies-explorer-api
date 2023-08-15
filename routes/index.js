const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { createUser, login } = require('../controllers/users');
const {
  userValidation,
  loginValidation,
} = require('../middlewares/requestValidation');
const { NOT_FOUND_ERROR_MESSAGE } = require('../errors/errorMessage');

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
});
module.exports = router;
