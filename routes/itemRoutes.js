const express = require('express');
const itemController = require('../controllers/itemController');
const offerController = require('../controllers/offerController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { validateId, validateItem, validateResult } = require('../middlewares/validator');
const { isLoggedIn, isSeller, isNotSeller, isActive, validateOffer } = require('../middlewares/auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

//item routes
router.get('/', itemController.index);
router.get('/search', itemController.search);
router.get('/new', isLoggedIn, itemController.new);
router.post('/', isLoggedIn, validateItem, validateResult, upload.single('image'), itemController.create);
router.get('/:id', validateId, itemController.show);
router.get('/:id/edit', validateId, isLoggedIn, isSeller, itemController.edit);
router.put('/:id', validateId, isLoggedIn, isSeller, validateItem, validateResult, itemController.update);
router.delete('/:id', validateId, isSeller, isLoggedIn, itemController.delete);

//offer routes
router.post('/:id/offer', validateId, isLoggedIn, isNotSeller, isActive, validateOffer, validateResult, offerController.create);
router.get('/:id/offers', validateId, isLoggedIn, isSeller, offerController.show);
router.post('/:id/offer/accept', validateId, isLoggedIn, isSeller, offerController.accept);

module.exports = router;