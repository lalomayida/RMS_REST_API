const conn = require('../config/database-connection')
const requisitionNeedsQueries = require('../models/requisition-need')
var querySelector = new requisitionNeedsQueries()

module.exports = {
    get_all_requisition_needs: (req, res) => {
        conn.query(querySelector.get_all_requisition_needs(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_all_requisition_needs")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving get_all_requisition_needs")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
    get_assigned_requisition_needs: (req, res) => {
        conn.query(querySelector.get_assigned_requisition_needs(req.query.idRequisition),
            (error, result) => {
                if (error) {
                    console.log("Error in get_assigned_requisition_needs")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("No available records, error retreiving get_assigned_requisition_needs")
                    res.send({
                        status: 'error',
                        error: {
                            code: "1084",
                            description: "No visible rooms"
                        }
                    })
                } else {
                    console.log("Success retreiving get_assigned_requisition_needs")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    set_requisition_need: (req, res) => {
        conn.query(querySelector.set_requisition_need(req.body.idRequisition, req.body.idNeed, req.body.quantity),
            (error, result) => {
                if (error) {
                    console.log("Error in set_requisition_need")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving set_requisition_need")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
}
