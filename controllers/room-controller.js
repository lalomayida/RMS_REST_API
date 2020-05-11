const conn = require('../config/database-connection')
const roomController = require('../models/room')
var querySelector = new roomController()

module.exports = {
    get_all_rooms: (req, res) => {
        conn.query(querySelector.get_all_rooms(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_all_rooms")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success retreiving get_all_rooms")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }
        )
    },
    get_visible_rooms: (req, res) => {
        conn.query(querySelector.get_visible_rooms(),
            (error, result) => {
                if (error) {
                    console.log("Error in get_visible_rooms")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else if ((result.rows).length === 0) {
                    console.log("No visible rooms, retreiving 0 records for get_visible_rooms")
                    res.send({
                        status: 'error',
                        error: {
                            code: "10846",
                            description: "No visible rooms"
                        }
                    })
                } else {
                    console.log("Success retreiving get_visible_rooms")
                    res.send({
                        status: 'success',
                        data: result.rows
                    })
                }
            }

        )
    },
    get_room_information: async (idRoom) => {
        let getRoomInformationPromise = new Promise((res, err) => {
            conn.query(querySelector.get_room_information(idRoom),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_room_information")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retreiving get_room_information")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getRoomInformationPromise
        return response
    },
    set_new_room: async (req, res) => {
        let setNewRoomPromise = new Promise((res, err) => {
            conn.query(querySelector.set_new_room(req.body.type.id, req.body.name, req.body.capacity, req.body.width, req.body.length),
                (error, result) => {
                    if (error) {
                        console.log("Error in set_new_room")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in set_new_room")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await setNewRoomPromise
        return response
    },
    edit_existing_room: async (req, res) => {
        let editExistingRoomPromise = new Promise((res, err) => {
            conn.query(querySelector.edit_existing_room(req.body.id, req.body.capacity, req.body.is_visible),
                (error, result) => {
                    if (error) {
                        console.log("Error in edit_existing_room")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in edit_existing_room")
                        return res({
                            status: 'success',
                            despription: 'Room edited successfully'
                        })
                    }
                }
            )
        })
        let response = await editExistingRoomPromise
        return response
    },
}
