const conn = require('../config/database-connection')
const statusQueries = require('../models/requisition-need')
var querySelector = new statusQueries()

module.exports = {
    get_status_when_open: (req, res) => {
        conn.query(querySelector.get_status_when_open(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_status_when_open")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving get_status_when_open")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
    get_status_when_in_progress: (req, res) => {
        conn.query(querySelector.get_status_when_in_progress(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_status_when_in_progress")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving get_status_when_in_progress")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
    get_status_when_approved: (req, res) => {
        conn.query(querySelector.get_status_when_approved(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_status_when_approved")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving get_status_when_approved")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
    get_status_when_rejected: (req, res) => {
        conn.query(querySelector.get_status_when_rejected(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_status_when_rejected")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving get_status_when_rejected")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
}
