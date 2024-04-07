const express = require('express');
const controller = require('../controllers/itemController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { validateId } = require('../middlewares/validator');
const { isLoggedIn, isSeller } = require('../middlewares/auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, upload.single('image'), controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isSeller, controller.edit);

router.put('/:id', validateId, isLoggedIn, isSeller, controller.update);

router.delete('/:id', validateId, isSeller, isLoggedIn, controller.delete);

module.exports = router;