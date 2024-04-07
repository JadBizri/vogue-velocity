const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router.get('/register', controller.new);
router.get('/login', controller.enter);
router.post('/login', controller.login);
router.post('/register', controller.create);
router.get('/profile', controller.show);
router.get('/logout', controller.logout);

module.exports = router;