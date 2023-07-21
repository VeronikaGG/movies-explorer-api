const router = require('express').Router();

const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');
// const { movieValidation, movieIdValidation } = require('../middlewares/requestValidation');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
