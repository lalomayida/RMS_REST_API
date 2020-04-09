const conn = require('../config/database-connection')
const roleQueries = require('../models/role')
var querySelector = new roleQueries()

module.exports = {
    get_all_roles: (req, res) => {
        conn.query(querySelector.get_all_roles(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_all_roles")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in get_all_roles")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
}
