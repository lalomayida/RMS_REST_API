const requisitionNeedController = require('../controllers/requisition-need-controller')
const requisitionController = require('../controllers/requisition-controller')
const approvalListController = require('../controllers/approval-list-controller')
const commentController = require('../controllers/comment-controller')
const roomController = require('../controllers/room-controller')
const userController = require('../controllers/user-controller')
const departmentController = require('../controllers/department-controller')
const statusController = require('../controllers/status-controller')


module.exports = {
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
        }

        let response = {}
        response.id = req.query.id
        response.room = roomInformation.data
        response.user = userInformation.data
        response.agent = agentInformation.data
        response.department = departmentInformation.data
        response.initialDate = requisitionInformation.data.initial_date
        response.finalDate = requisitionInformation.data.final_date
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
        let approvalList = await approvalListController.get_department_approval_list(req.body.department.id)
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
            await commentController.set_requisition_comment(req, res)
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

        let approvalListResponse = await approvalListController.get_department_approval_list(req.body.department.id);
        let approvalList = approvalListResponse.data

        if (agentLevel != Object.keys(approvalList).length) {
            agentLevel += 1
            let newAgent = approvalList[agentLevel.toString()]
            await requisitionController.edit_requisition_agent(req.body.id, newAgent)
        }

        await requisitionController.edit_requisition_status(req, res)
        if ((req.body.comment).length != 0) {
            await commentController.set_requisition_comment(req, res)
        }
        console.log("Success in promote_requisition")
        res.send({
            status: 'success',
            data: 'Requisition promoted successfully'
        })
    }
}