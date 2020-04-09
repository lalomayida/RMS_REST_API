const express = require('express')
const router = express.Router();

// Controllers initialization
const userController = require('../controllers/user-controller')
const roleController = require('../controllers/role-controller')

// GET routes
router.get('/user-management/users', userController.get_all_users)
router.get('/user-management/user-password', userController.get_user_password)
router.get('/role-management/roles', roleController.get_all_roles)

// POST routes
router.post('/user-management/users', userController.set_new_user)

// PUT routes
router.put('/user-management/users', userController.edit_existing_user)

module.exports = router