const conn = require('../config/database-connection')
const requisitionQueries = require('../models/requisition')
var querySelector = new requisitionQueries()

module.exports = {
    get_admin_requisitions: (req, res) => {
        conn.query(querySelector.get_admin_requisitions(req.query.agent.id),
            (error, result) => {
                if (error) {
                    console.log("Error in get_admin_requisitions")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("No available records, retreiving 0 records for get_admin_requisitions")
                    res.send({
                        status: 'error',
                        error: {
                            code: "10847",
                            description: "No visible requisitions"
                        }
                    })
                } else {
                    console.log("Success retreiving get_admin_requisitions")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_user_requisitions: (req, res) => {
        conn.query(querySelector.get_user_requisitions(req.query.expedientNumber),
            (error, result) => {
                if (error) {
                    console.log("Error in get_user_requisitions")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("No available records, retreiving 0 records for get_user_requisitions")
                    res.send({
                        status: 'error',
                        error: {
                            code: "10851",
                            description: "No visible requisitions"
                        }
                    })
                } else {
                    console.log("Success retreiving get_user_requisitions")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_requisition_information: async (idRequisition) => {
        let getRequisitionInformationPromise = new Promise((res, err) => {
            conn.query(querySelector.get_requisition_information(idRequisition),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_requisition_information")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retreiving get_requisition_information")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getRequisitionInformationPromise
        return response
    },
    set_new_requisition: async (req, res) => {
        let setNewRequisitionPromise = new Promise((res, err) => {            
            conn.query(querySelector.set_new_requisition(req.body.room.id, req.body.user.id, req.body.initialDate, req.body.finalDate, req.body.description, req.body.agent.id, req.body.department.id),
                (error, result) => {
                    if (error) {
                        console.log("Error in set_new_requisition")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in set_new_requisition")
                        return res({
                            status: 'success',
                            data: result.rows[0]
                        })
                    }
                }
            )
        })
        let response = await setNewRequisitionPromise
        return response
    },
    edit_requisition_status: async (req, res) => {
        let editRequisitionStatus = new Promise((res, err) => {
            conn.query(querySelector.edit_requisition_status(req.body.id, req.body.status.id),
                (error, result) => {
                    if (error) {
                        console.log("Error in edit_requisition_status")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in edit_requisition_status")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await editRequisitionStatus
        return response
    },
    edit_requisition_agent: async (idRequisition,newAgent) => {
        let editRequisitionAgentPromise = new Promise((res, err) => {
            conn.query(querySelector.edit_requisition_agent(idRequisition, newAgent),
                (error, result) => {
                    if (error) {
                        console.log("Error in edit_requisition_agent")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in edit_requisition_agent")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                })
        })
        let response = await editRequisitionAgentPromise
        return response
    },
}
