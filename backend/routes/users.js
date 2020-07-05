const router = require('express').Router();
const controller = require('../controllers/users')

// GET -> '/users'
router.route('/').get(controller.users_index);

// POST -> '/users'
router.route('/').post(controller.user_create);

module.exports = router;