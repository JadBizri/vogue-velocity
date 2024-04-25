const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');
const { validateLogin, validateResult, validateSignup } = require('../middlewares/validator');

const router = express.Router();

router.get('/register', isGuest, controller.new);
router.get('/login', isGuest, controller.enter);
router.post('/login', isGuest, validateLogin, validateResult, controller.login);
router.post('/', isGuest, validateSignup, validateResult, controller.create);
router.get('/profile', isLoggedIn, controller.show);
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;