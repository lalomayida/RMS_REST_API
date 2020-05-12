const conn = require('../config/database-connection')
const requisitionNeedsQueries = require('../models/comment')
var querySelector = new requisitionNeedsQueries()

module.exports = {
    get_requisition_comments: async (idRequisition) => {
        let getRequisitionCommentPromise = new Promise((res, err) => {
            conn.query(querySelector.get_requisition_comments(idRequisition),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_requisition_comments")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else if ((result.rows).length === 0) {
                        console.log("No available records, retreiving 0 records for get_requisition_comments")
                        return res({
                            status: 'error',
                            error: {
                                code: "10850",
                                description: "No available comments"
                            }
                        })
                    } else {
                        console.log("Success retreiving get_requisition_comments")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await getRequisitionCommentPromise
        return response
    },
    set_requisition_comment: async (id, comment) => {
        let setRequisitionCommentPromise = new Promise((res, err) => {
            conn.query(querySelector.set_requisition_comment(comment.user.id, comment.comment, id),
                (error, result) => {
                    if (error) {
                        console.log("Error in set_requisition_comment")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in set_requisition_comment")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await setRequisitionCommentPromise
        return response
    },
}