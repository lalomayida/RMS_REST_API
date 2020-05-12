const conn = require('../config/database-connection')
const statusQueries = require('../models/status')
var querySelector = new statusQueries()

module.exports = {
    get_status: (req, res) => {
        conn.query(querySelector.get_status(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_status")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving get_status")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_requisition_status: async (idStatus) => {
        let getRequisitionStatusPromise = new Promise((res, err) => {
            conn.query(querySelector.get_requisition_status(idStatus),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_requisition_status")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retrieving get_requisition_status")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getRequisitionStatusPromise
        return response
    },
}
