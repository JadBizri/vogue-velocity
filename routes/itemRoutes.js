const express = require('express');
const controller = require('../controllers/itemController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {validateId} = require('../middlewares/validator');
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

router.get('/new', controller.new);

router.post('/', upload.single('image'), controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, controller.edit);

router.put('/:id', validateId, controller.update);

router.delete('/:id', validateId, controller.delete);

module.exports = router;