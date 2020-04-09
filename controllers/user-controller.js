const conn = require('../config/database-connection')
const userQueries = require('../models/user')
var querySelector = new userQueries()

module.exports = {
    get_all_users: (req, res) => {
        conn.query(querySelector.get_all_users(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_all_users")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retreiving get_all_users")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_user_password: (req, res) => {
        conn.query(querySelector.get_user_password(req.query.expedientNumber),
            (error, result) => {
                if (error) {
                    console.log("Error in get_user_password")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("Unknown user, error retreiving get_user_password")
                    res.send({
                        status: 'error',
                        error: {
                            code: "10845",
                            description: "Unknown user"
                        }
                    })
                } else {
                    console.log("Success retreiving get_user_password")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    set_new_user: (req, res) => {
        conn.query(querySelector.set_new_user(req.body.roleId, req.body.expedientNumber, req.body.password, req.body.name, req.body.surname, req.body.mail),
            (error, result) => {
                if (error) {
                    if (error.code == "23505") {
                        console.log("Error in set_new_user, user allready exists")
                        res.send({
                            status: 'error',
                            error: {
                                code: error.code,
                                description: 'User already exists'
                            }
                        })
                    }
                    else {
                        console.log("Error in set_new_user")
                        res.send({
                            status: 'error',
                            error: error
                        })
                    }

                }

                else {
                    console.log("Success in set_new_user")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    edit_existing_user: (req, res) => {
        conn.query(querySelector.edit_existing_user(req.body.roleId, req.body.expedientNumber, req.body.password, req.body.mail, req.body.isVisible),
            (error, result) => {
                if (error) {
                    console.log("Error in edit_existing_user")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in edit_existing_user")
                    res.send({
                        status: 'success',
                        despription: 'User edited successfully'
                    })
                }
            }
        )
    },
}
