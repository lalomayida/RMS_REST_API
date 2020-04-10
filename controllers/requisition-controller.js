const conn = require('../config/database-connection')
const requisitionQueries = require('../models/requisition')
var querySelector = new requisitionQueries()

module.exports = {
    get_admin_requisitions: (req, res) => {
        conn.query(querySelector.get_admin_requisitions(req.query.idAgent),
            (error, result) => {
                if (error) {
                    console.log("Error in get_admin_requisitions")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("No available records, error retreiving get_admin_requisitions")
                    res.send({
                        status: 'error',
                        error: {
                            code: "10847",
                            description: "No visible rooms"
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
    set_new_requisition: (req, res) => {
        conn.query(querySelector.set_new_requisition(req.body.idRoom, req.body.idUser, req.body.initialDate, req.body.finalDate, req.body.description, req.body.idAgent),
            (error, result) => {
                if (error) {
                    console.log("Error in set_new_requisition")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in set_new_requisition")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
    edit_requisition_status: (req, res) => {
        conn.query(querySelector.edit_requisition_status(req.body.idRequisition,req.body.idStatus),
            (error, result) => {
                if (error) {
                    console.log("Error in edit_requisition_status")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in edit_requisition_status")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
    edit_requisition_agent: (req, res) => {
        conn.query(querySelector.edit_requisition_agent(req.body.idRequisition,req.body.idAgent),
            (error, result) => {
                if (error) {
                    console.log("Error in edit_requisition_agent")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in edit_requisition_agent")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
}
