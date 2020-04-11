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
                        data: result.rows
                    })
                }
            }
        )
    },
    get_assigned_room_attibutes: async (idRoom) => {
        let getAssignedRoomAttributes = new Promise((res, err) => {
            conn.query(querySelector.get_assigned_room_attibutes(idRoom),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_assigned_room_attibutes")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else if ((result.rows).length === 0) {
                        console.log("No available records, retreiving 0 records for get_assigned_room_attibutes")
                        return res({
                            status: 'error',
                            error: {
                                code: "10848",
                                description: "No visible rooms"
                            }
                        })
                    } else {
                        console.log("Success retreiving get_assigned_room_attibutes")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await getAssignedRoomAttributes
        return response
    },
    get_room_attribute_assignation: async (idRoom, idAttribute) => {
        let getRoomAttributeAssignation = new Promise((res, err) => {
            conn.query(querySelector.get_room_attribute_assignation(idRoom, idAttribute),
                (error, result) => {
                    if (error) {
                        console.log("Error in get_room_attribute_assignation")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success retrieving get_room_attribute_assignation")
                        return res({
                            status: 'success',
                            data: (result.rows)[0]
                        })
                    }
                }
            )
        })
        let response = await getRoomAttributeAssignation
        return response
    },
    set_room_attribute: async (idRoom, attribute) => {
        let setRoomAttributePromise = new Promise((res, err) => {
            conn.query(querySelector.set_room_attribute(idRoom, attribute.id_attribute, attribute.quantity),
                (error, result) => {
                    if (error) {
                        console.log("Error in set_room_attribute")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in set_room_attribute")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await setRoomAttributePromise
        return response
    },
    edit_existing_room_attribute: async (idAssignation, quantity) => {
        let editExistingRoomAttributePromise = new Promise((res, err) => {
            conn.query(querySelector.edit_existing_room_attribute(idAssignation, quantity),
                (error, result) => {
                    if (error) {
                        console.log("Error in edit_existing_room_attribute")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in edit_existing_room_attribute")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await editExistingRoomAttributePromise
        return response
    },
    delete_existing_room_attribute: async (idAssignation) => {
        let deleteAttributePromise = new Promise((res, err) => {
            conn.query(querySelector.delete_existing_room_attribute(idAssignation),
                (error, result) => {
                    if (error) {
                        console.log("Error in delete_existing_room_attribute")
                        return res({
                            status: 'error',
                            error: error
                        })
                    }
                    else {
                        console.log("Success in delete_existing_room_attribute")
                        return res({
                            status: 'success',
                            data: result.rows
                        })
                    }
                }
            )
        })
        let response = await deleteAttributePromise
        return response
    },
}
