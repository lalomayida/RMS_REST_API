const conn = require('../config/database-connection')
const roomAtrtibuttesQueries = require('../models/room-attribute')
var querySelector = new roomAtrtibuttesQueries()

module.exports = {
    get_all_room_attributes: (req, res) => {
        conn.query(querySelector.get_all_room_attributes(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_all_room_attributes")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retrieving get_all_room_attributes")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
    get_assigned_room_attibutes: (req, res) => {
        conn.query(querySelector.get_assigned_room_attibutes(req.query.isRoom),
            (error, result) => {
                if (error) {
                    console.log("Error in get_assigned_room_attibutes")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("No available records, error retreiving get_assigned_room_attibutes")
                    res.send({
                        status: 'error',
                        error: {
                            code: "10848",
                            description: "No visible rooms"
                        }
                    })
                } else {
                    console.log("Success retreiving get_assigned_room_attibutes")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    set_room_attribute: (req, res) => {
        conn.query(querySelector.set_room_attribute(req.body.idRoom, req.body.idAttribute, req.body.quantity),
            (error, result) => {
                if (error) {
                    console.log("Error in set_room_attribute")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in set_room_attribute")
                    res.send({
                        status: 'success',
                        despription: result.rows
                    })
                }
            }
        )
    },
}
