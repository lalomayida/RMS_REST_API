const conn = require('../config/database-connection')
const departmentQueries = require('../models/department')
var querySelector = new departmentQueries()

module.exports = {
    get_all_departments: (req, res) => {
        conn.query(querySelector.get_all_departments(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_all_departments")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retreiving get_all_departments")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_department_information: async (idDepartment) => {
        let getDepartmentInformation = new Promise((res, err) => {
            conn.query(querySelector.get_department_information(idDepartment),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_department_information")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retrieving get_department_information")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getDepartmentInformation
        return response
    },
}