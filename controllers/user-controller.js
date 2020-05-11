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
    get_visible_agents: (req, res) => {
        conn.query(querySelector.get_visible_agents(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_visible_agents")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retreiving get_visible_agents")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_visible_users: (req, res) => {
        conn.query(querySelector.get_visible_users(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_visible_users")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retreiving get_visible_users")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_user_token: async (email, password) => {
        let getUserTokenPromise = new Promise((res, err) => {
            conn.query(querySelector.get_user_token(email, password),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_user_token")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else if ((result.rows).length === 0) {
                        console.log("Unknown user, retreiving 0 records for get_user_token")
                        return res({
                            status: 'error',
                            error: {
                                code: "10845",
                                description: "Unknown user"
                            }
                        })
                    } else {
                        console.log("Success retreiving get_user_token")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await getUserTokenPromise
        return response
    },
    get_user_information: async (idUser) => {
        let getUserInformationPromise = new Promise((res, err) => {
            conn.query(querySelector.get_user_information(idUser),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_user_information")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retreiving get_user_information")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getUserInformationPromise
        return response
    },
    get_user_id: async (expedientNumber) => {
        let getUserIdPromise = new Promise((res, err) => {
            conn.query(querySelector.get_user_id(expedientNumber),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_user_id")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retreiving get_user_id")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getUserIdPromise
        return response
    },
    get_user_id_email: async (email) => {
        let getUserIdPromise = new Promise((res, err) => {
            conn.query(querySelector.get_user_id_email(email),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_user_id_email")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retreiving get_user_id_email")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getUserIdPromise
        return response
    },
    get_user_role: async (userId) => {
        let getUserRolePromise = new Promise((res, err) => {
            conn.query(querySelector.get_user_role(userId),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_user_role")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retreiving get_user_role")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getUserRolePromise
        return response
    },
    set_new_user: (req, res) => {
        conn.query(querySelector.set_new_user(req.body.role.id, req.body.expedient_number, req.body.password, req.body.name, req.body.surname, req.body.mail),
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
        conn.query(querySelector.edit_existing_user(req.body.role.id, req.body.expedient_number, req.body.name, req.body.surname, req.body.password, req.body.mail, req.body.is_visible),
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
