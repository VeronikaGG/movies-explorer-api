const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { profileValidation } = require('../middlewares/requestValidation');

router.get('/me', getUser);
router.patch('/me', profileValidation, updateUser);

module.exports = router;
