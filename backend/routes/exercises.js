const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const controller = require('../controllers/exercises')

// GET -> '/exercises'
router.route('/').get(controller.exercises_index);

// POST -> '/exercises'
router.route('/').post(controller.exercises_create);

// GET -> '/exercises/:id'
router.route('/:id').get(controller.exercises_show);

// DELETE -> '/exercises/:id'
router.route('/:id').delete(controller.exercises_destroy);

//PUT -> '/exercises/:id'
router.route('/:id').put(controller.exercises_update)

module.exports = router;