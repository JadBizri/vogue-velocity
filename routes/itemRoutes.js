const express = require('express');
const controller = require('../controllers/itemController');
const router = express.Router();

//GET /stories: send all stories to the user
router.get('/', controller.index);

//GET /stories/new: send html form for creating a new story
router.get('/new', controller.new);

//POST /stories: create a new story
router.post('/', controller.create);

//GET /stories/:id: send details of a specific story
router.get('/:id', controller.show);

//GET /stories/:id/edit: send html form for editing a specific story
router.get('/:id/edit', controller.edit);

//PUT /stories/:id: update a specific story
router.put('/:id', controller.update);

//DELETE /stories/:id: delete a specific story
router.delete('/:id', controller.delete);

module.exports = router;