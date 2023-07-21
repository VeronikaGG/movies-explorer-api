const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const { createUser, login } = require('../controllers/users');
const { userValidation, loginValidation } = require('../middlewares/requestValidation');
const { auth } = require('../middlewares/auth');
const { NOT_FOUND_ERROR_MESSAGE } = require('../errors/errorMessage');

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
});
module.exports = router;
