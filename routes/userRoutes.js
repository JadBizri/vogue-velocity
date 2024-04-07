const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');

const router = express.Router();

router.get('/register', isGuest, controller.new);
router.get('/login', isGuest, controller.enter);
router.post('/login', isGuest, controller.login);
router.post('/', isGuest, controller.create);
router.get('/profile', isLoggedIn, controller.show);
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;