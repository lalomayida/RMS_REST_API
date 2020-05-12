const requisitionNeedController = require('../controllers/requisition-need-controller')
const requisitionController = require('../controllers/requisition-controller')
const approvalListController = require('../controllers/approval-list-controller')
const commentController = require('../controllers/comment-controller')
const roomController = require('../controllers/room-controller')
const userController = require('../controllers/user-controller')
const departmentController = require('../controllers/department-controller')
const statusController = require('../controllers/status-controller')

module.exports = {
    get_user_requisitions: async (req, res) => {
        console.log("Start process get_user_requisitions")
        let userRequisitions = await requisitionController.get_user_requisitions(req.query.id)
        response = {}
        for (let requisition in userRequisitions.data) {

            let roomInformation = await roomController.get_room_information(userRequisitions.data[requisition].id_room)
            let agentInformation = await userController.get_user_information(userRequisitions.data[requisition].id_agent)
            let statusInformation = await statusController.get_requisition_status(userRequisitions.data[requisition].id_status)

            userRequisitions.data[requisition].room = {
                id: roomInformation.data.id,
                name: roomInformation.data.name
            }

            userRequisitions.data[requisition].agent = {
                id: agentInformation.data.id,
                name: agentInformation.data.name,
                surname: agentInformation.data.surname
            }

            userRequisitions.data[requisition].status = statusInformation.data
            userRequisitions.data[requisition].initial_date = userRequisitions.data[requisition].initial_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            userRequisitions.data[requisition].final_date = userRequisitions.data[requisition].final_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            delete userRequisitions.data[requisition].id_room
            delete userRequisitions.data[requisition].id_agent
            delete userRequisitions.data[requisition].id_status

        }
        console.log("Success in get_user_requisitions")
        response = userRequisitions.data
        res.send({
            status: 'success',
            data: response
        })
    },
    get_admin_requisitions: async (req, res) => {
        console.log("Start process get_admin_requisitions")
        let agentRequisitions = await requisitionController.get_admin_requisitions(req.query.id)
        response = {}
        for (let requisition in agentRequisitions.data) {

            let roomInformation = await roomController.get_room_information(agentRequisitions.data[requisition].id_room)
            let agentInformation = await userController.get_user_information(agentRequisitions.data[requisition].id_user)
            let statusInformation = await statusController.get_requisition_status(agentRequisitions.data[requisition].id_status)

            agentRequisitions.data[requisition].room = {
                id: roomInformation.data.id,
                name: roomInformation.data.name
            }

            agentRequisitions.data[requisition].user = {
                id: agentInformation.data.id,
                name: agentInformation.data.name,
                surname: agentInformation.data.surname
            }

            agentRequisitions.data[requisition].status = statusInformation.data
            agentRequisitions.data[requisition].initial_date = agentRequisitions.data[requisition].initial_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            agentRequisitions.data[requisition].final_date = agentRequisitions.data[requisition].final_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            delete agentRequisitions.data[requisition].id_room
            delete agentRequisitions.data[requisition].id_user
            delete agentRequisitions.data[requisition].id_status

        }
        console.log("Success in get_admin_requisitions")
        response = agentRequisitions.data
        res.send({
            status: 'success',
            data: response
        })
    },
    get_all_requisitions: async (req, res) => {
        console.log("Start process get_all_requisitions")
        let allRequisitions = await requisitionController.get_all_requisitions()
        response = {}
        for (let requisition in allRequisitions.data) {

            let roomInformation = await roomController.get_room_information(allRequisitions.data[requisition].id_room)
            let agentInformation = await userController.get_user_information(allRequisitions.data[requisition].id_user)
            let statusInformation = await statusController.get_requisition_status(allRequisitions.data[requisition].id_status)

            allRequisitions.data[requisition].room = {
                id: roomInformation.data.id,
                name: roomInformation.data.name
            }

            allRequisitions.data[requisition].user = {
                id: agentInformation.data.id,
                name: agentInformation.data.name,
                surname: agentInformation.data.surname
            }

            allRequisitions.data[requisition].status = statusInformation.data
            allRequisitions.data[requisition].initial_date = allRequisitions.data[requisition].initial_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            allRequisitions.data[requisition].final_date = allRequisitions.data[requisition].final_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
            delete allRequisitions.data[requisition].id_room
            delete allRequisitions.data[requisition].id_user
            delete allRequisitions.data[requisition].id_status

        }
        console.log("Success in get_all_requisitions")
        response = allRequisitions.data
        res.send({
            status: 'success',
            data: response
        })
    },
    get_requisition_information: async (req, res) => {
        console.log("Start process get_requisition_information")
        let requisitionInformation = await requisitionController.get_requisition_information(req.query.id)
        let roomInformation = await roomController.get_room_information(requisitionInformation.data.id_room)
        let userInformation = await userController.get_user_information(requisitionInformation.data.id_user)
        let agentInformation = await userController.get_user_information(requisitionInformation.data.id_agent)
        let departmentInformation = await departmentController.get_department_information(requisitionInformation.data.id_department)
        let statusInformation = await statusController.get_requisition_status(requisitionInformation.data.id_status)
        let approvalList = await approvalListController.get_department_approval_list(requisitionInformation.data.id_department)
        for (level in approvalList.data) {
            if (approvalList.data[level] === agentInformation.data.expedient_number) {
                agentInformation.data.level = level
            }
        }

        let requisitionNeedInformation = await requisitionNeedController.get_assigned_requisition_needs(req.query.id)
        if (requisitionNeedInformation.error) {
            requisitionNeedInformation.data = []
        }

        let commentInformation = await commentController.get_requisition_comments(req.query.id)
        if (commentInformation.error) {
            commentInformation.data = []
        } else if (commentInformation.status == 'success') {
            for (comment in commentInformation.data) {
                let userInformation = await userController.get_user_information(commentInformation.data[comment].id_user);
                commentInformation.data[comment].user = userInformation.data;
                delete commentInformation.data[comment].id_user;
                delete commentInformation.data[comment].user.password;
            }
        }

        delete userInformation.data.password;
        delete agentInformation.data.password;
        delete roomInformation.data.id_room_type

        let response = {}
        response.id = req.query.id
        response.room = roomInformation.data
        response.user = userInformation.data
        response.agent = agentInformation.data
        response.deparment = departmentInformation.data
        response.initialDate = requisitionInformation.data.initial_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
        response.finalDate = requisitionInformation.data.final_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
        response.description = requisitionInformation.data.description
        response.status = statusInformation.data
        response.comment = commentInformation.data
        response.need = requisitionNeedInformation.data

        console.log("Success in get_requisition_information")
        res.send({
            status: 'success',
            data: response
        })

    },
    create_new_requisition: async (req, res) => {
        console.log("Start process create_new_requisition")
        let approvalList = await approvalListController.get_department_approval_list(req.body.deparment.id)
        let agentExpedientNumer = approvalList.data["1"]
        let agentId = await userController.get_user_id(agentExpedientNumer)
        req.body.agent.id = agentId.data.id
        let requisitionResponse = await requisitionController.set_new_requisition(req, res)
        if (requisitionResponse.data) {
            let newRequisitionId = requisitionResponse.data.id

            for (let need of req.body.need) {
                await requisitionNeedController.set_requisition_need(newRequisitionId, need)
            }

            console.log("Success in create_new_requisition")
            res.send({
                status: 'success',
                data: 'Requisition created successfully'
            })
        }
        else {
            console.log("Error in create_new_requisition")
            res.send({
                status: 'error',
                error: {
                    code: "10852",
                    description: "Error when creating new requisition"
                }
            })
        }
    },
    edit_existing_requisition: async (req, res) => {
        console.log("Start process edit_existing_requisition")
        await requisitionController.edit_requisition_status(req, res)
        if ((req.body.comment).length != 0) {
            for(comment in req.body.comment){
                await commentController.set_requisition_comment(req.body.id, req.body.comment[comment])    
            }
        }
        console.log("Success in edit_existing_requisition")
        res.send({
            status: 'success',
            data: 'Requisition edited successfully'
        })
    },
    promote_requisition: async (req, res) => {
        console.log("Start process promote_requisition")
        let agentLevel = Number(req.body.agent.level)

        let approvalListResponse = await approvalListController.get_department_approval_list(req.body.deparment.id);
        let approvalList = approvalListResponse.data

        if (agentLevel != Object.keys(approvalList).length) {
            agentLevel += 1
            let newAgent = approvalList[agentLevel.toString()]
            await requisitionController.edit_requisition_agent(req.body.id, newAgent)
        }

        await requisitionController.edit_requisition_status(req, res)
        if ((req.body.comment).length != 0) {
            for(comment in req.body.comment){
                await commentController.set_requisition_comment(req.body.id, req.body.comment[comment])    
            }
        }
        console.log("Success in promote_requisition")
        res.send({
            status: 'success',
            data: 'Requisition promoted successfully'
        })
    }
}