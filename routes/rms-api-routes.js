const express = require('express')
const router = express.Router();

// Controllers initialization
const userController = require('../controllers/user-controller')
const roleController = require('../controllers/role-controller')
const roomController = require('../controllers/room-controller')
const roomTypeController = require('../controllers/room-type-controller')
const roomAttibuteController = require('../controllers/room-attribute-controller')
const requisitionNeedsController = require('../controllers/requisition-need-controller')
const requisitionController = require('../controllers/requisition-controller')
const mainRequisitionController = require('../controllers/main-requisition-controller')
const mainRoomController = require('../controllers/main-room-controller')
const mainUserController = require('../controllers/main-user-controller')
const departmentController = require('../controllers/department-controller')
const statusController = require('../controllers/status-controller')

// GET routes
router.get('/user-management/users', userController.get_all_users)
router.get('/user-management/user-information', mainUserController.get_user_information)
router.get('/user-management/visible-users', userController.get_visible_users)
router.get('/user-management/visible-agents', userController.get_visible_agents)
router.get('/role-management/roles', roleController.get_all_roles)
router.get('/status-management/status', statusController.get_status)
router.get('/room-management/room-types',roomTypeController.get_room_types)
router.get('/room-management/visible-rooms', roomController.get_visible_rooms)
router.get('/room-management/room-information', mainRoomController.get_room_information)
router.get('/room-management/rooms', roomController.get_all_rooms)
router.get('/room-management/attributes', roomAttibuteController.get_all_room_attributes)
router.get('/departmet-management/departments',departmentController.get_all_departments)

router.get('/requisition-management/user-requisitions',mainRequisitionController.get_user_requisitions)
router.get('/requisition-management/agent-requisitions',mainRequisitionController.get_admin_requisitions)
router.get('/requisition-management/all-requisitions',mainRequisitionController.get_all_requisitions)
router.get('/requisition-management/needs', requisitionNeedsController.get_all_requisition_needs)
router.get('/requisition-management/requisition-information',mainRequisitionController.get_requisition_information)

// POST routes
router.post('/auth/login', mainUserController.get_user_token)
router.post('/user-management/users', userController.set_new_user)
router.post('/room-management/rooms', mainRoomController.create_new_room)
router.post('/requisition-management/requisition',mainRequisitionController.create_new_requisition)

// PUT routes
router.put('/user-management/users', userController.edit_existing_user)
router.put('/room-management/rooms', mainRoomController.edit_existing_room)
router.put('/requisition-management/requisition',mainRequisitionController.edit_existing_requisition)
router.put('/requisition-management/promote',mainRequisitionController.promote_requisition)
router.put('/requisition-management/delete-requisition',requisitionController.delete_requisition)

module.exports = router