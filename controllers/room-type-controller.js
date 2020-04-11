const conn = require('../config/database-connection')
const roomTypeController = require('../models/room-type')
var querySelector = new roomTypeController()

module.exports = {
    get_room_type_information: async (idRoom) => {
        let getRoomTypeInformationPromise = new Promise((res, err) => {
            conn.query(querySelector.get_room_type_information(idRoom),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_room_type_information")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retreiving get_room_type_information")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getRoomTypeInformationPromise
        return response
    },
    get_room_types: (req, res) => {
        conn.query(querySelector.get_room_types(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_room_types")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retreiving get_room_types")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
}