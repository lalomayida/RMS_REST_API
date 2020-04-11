const conn = require('../config/database-connection')
const approvalListQueries = require('../models/approval-list')
var querySelector = new approvalListQueries()

module.exports = {
    get_department_approval_list: async (idDepartment) => {
        let getDepartmentApprovalList = new Promise((res, err) => {
            conn.query(querySelector.get_department_approval_list(idDepartment),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_department_approval_list")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retrieving get_department_approval_list")
                        return res({
                            status: 'success',
                            data: (result.rows)[0].approval_list
                        })
                    }
                }
            )
        })
        let response = await getDepartmentApprovalList
        return response
    },
}