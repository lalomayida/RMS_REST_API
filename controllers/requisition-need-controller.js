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
                        data: result.rows
                    })
                }
            }
        )
    },
    get_assigned_requisition_needs: async (idRequisition) => {
        let getAssignedRequisitionNeedsPromise = new Promise((res, err) => {
            conn.query(querySelector.get_assigned_requisition_needs(idRequisition),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_assigned_requisition_needs")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else if ((result.rows).length === 0) {
                        console.log("No available records, retreiving 0 records for get_assigned_requisition_needs")
                        return res({
                            status: 'error',
                            error: {
                                code: "10849",
                                description: "No visible rooms"
                            }
                        })
                    } else {
                        console.log("Success retreiving get_assigned_requisition_needs")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await getAssignedRequisitionNeedsPromise
        return response
    },
    set_requisition_need: async (requisitionId, need) => {
        let setRequisitionNeedPromise = new Promise((res, err) => {
            conn.query(querySelector.set_requisition_need(requisitionId, need.id_need, need.quantity),
                (error, result) => {
                    if (error) {
                        console.log("Error in set_requisition_need")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in set_requisition_need")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await setRequisitionNeedPromise
        return response
    },
    edit_existing_requisition_need: (req, res) => {
        conn.query(querySelector.edit_existing_requisition_need(req.body.idAssignation, req.body.idNeed, req.body.quantity),
            (error, result) => {
                if (error) {
                    console.log("Error in edit_existing_requisition_need")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in edit_existing_requisition_need")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    delete_existing_requisition_need: (req, res) => {
        conn.query(querySelector.delete_existing_requisition_need(req.body.idAssignation),
            (error, result) => {
                if (error) {
                    console.log("Error in delete_existing_requisition_need")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in delete_existing_requisition_need")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
}
