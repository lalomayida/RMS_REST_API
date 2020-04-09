const express = require('express')
const router = express.Router();

// Controllers initialization
const userController = require('../controllers/user-controller')

// GET routes
router.get('/user-management/users', userController.get_all_users)
router.get('/user-management/user-password', userController.get_user_password)

// POST routes
router.post('/user-management/users', userController.set_new_user)

// PUT routes
router.put('/user-management/users', userController.edit_existing_user)

module.exports = router