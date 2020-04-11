const express = require('express')
const router = express.Router();

// Controllers initialization
const userController = require('../controllers/user-controller')
const roleController = require('../controllers/role-controller')
const roomController = require('../controllers/room-controller')
const roomAttibuteController = require('../controllers/room-attribute-controller')
const requisitionNeedsController = require('../controllers/requisition-need-controller')
const mainRequisitionController = require('../controllers/main-requisition-controller')
const mainRoomController = require('../controllers/main-room-controller')
const departmentController = require('../controllers/department-controller')

// GET routes
router.get('/user-management/users', userController.get_all_users)
router.get('/user-management/visible-users', userController.get_visible_users)
router.get('/user-management/visible-agents', userController.get_visible_agents)
router.get('/user-management/user-password', userController.get_user_password)
router.get('/role-management/roles', roleController.get_all_roles)
router.get('/departmet-management/departments',departmentController.get_all_departments)
router.get('/room-management/visible-rooms', roomController.get_visible_rooms)
router.get('/room-management/rooms', mainRoomController.get_room_information)
router.get('/room-management/attributes', roomAttibuteController.get_all_room_attributes)
router.get('/requisition-management/needs', requisitionNeedsController.get_all_requisition_needs)
router.get('/requisition-management/requisitions',mainRequisitionController.get_requisition_information)

// POST routes
router.post('/user-management/users', userController.set_new_user)
router.post('/room-management/rooms', mainRoomController.create_new_room)
router.post('/requisition-management/requisitions',mainRequisitionController.create_new_requisition)

// PUT routes
router.put('/user-management/users', userController.edit_existing_user)
router.put('/room-management/rooms', mainRoomController.edit_existing_room)
router.put('/requisition-management/requisitions',mainRequisitionController.edit_existing_requisition)
router.put('/requisition-management/promote',mainRequisitionController.promote_requisition)

module.exports = router