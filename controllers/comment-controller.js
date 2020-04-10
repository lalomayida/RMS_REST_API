const conn = require('../config/database-connection')
const requisitionNeedsQueries = require('../models/requisition-need')
var querySelector = new requisitionNeedsQueries()

module.exports = {
    get_requisition_comments: (req, res) => {
        conn.query(querySelector.get_requisition_comments(req.query.idRequisition),
            (error, result) => {
                if (error) {
                    console.log("Error in get_requisition_comments")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("No available records, error retreiving get_requisition_comments")
                    res.send({
                        status: 'error',
                        error: {
                            code: "10850",
                            description: "No available comments"
                        }
                    })
                } else {
                    console.log("Success retreiving get_requisition_comments")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    set_requisition_comment: (req, res) => {
        conn.query(querySelector.set_requisition_comment(req.body.idUser,req.body.comment,req.body.idRequisiton),
            (error, result) => {
                if (error) {
                    console.log("Error in set_requisition_comment")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in set_requisition_comment")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
}