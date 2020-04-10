const express = require('express')
const router = express.Router();

// Controllers initialization
const userController = require('../controllers/user-controller')
const roleController = require('../controllers/role-controller')
const roomController = require('../controllers/room-controller')
const roomAttibuteController = require('../controllers/room-attribute-controller')
const requisitionNeedsController = require('../controllers/requisition-need-controller')

// GET routes
router.get('/user-management/users', userController.get_all_users)
router.get('/user-management/user-password', userController.get_user_password)
router.get('/role-management/roles', roleController.get_all_roles)
router.get('/room-management/rooms', roomController.get_all_rooms)
router.get('/room-management/visible-rooms', roomController.get_visible_rooms)
router.get('/room-attributes/attributes', roomAttibuteController.get_all_room_attributes)
router.get('/requisition-needs/needs', requisitionNeedsController.get_all_requisition_needs)

// POST routes
router.post('/user-management/users', userController.set_new_user)
router.post('/room-management/rooms', roomController.set_new_room)

// PUT routes
router.put('/user-management/users', userController.edit_existing_user)
router.put('/room-management/rooms', roomController.edit_existing_room)

module.exports = router