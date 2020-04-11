const roomController = require('../controllers/room-controller')
const roomTypeController = require('../controllers/room-type-controller')
const roomAttibuteController = require('../controllers/room-attribute-controller')
module.exports = {
    get_room_information: async (req, res) => {
        console.log("Start process get_room_information")
        let roomInformation = await roomController.get_room_information(req.query.id)
        let roomTypeInformation = await roomTypeController.get_room_type_information(req.query.id)
        let roomAttibuteInformation = await roomAttibuteController.get_assigned_room_attibutes(req.query.id)
        if (roomAttibuteInformation.error) {
            roomAttibuteInformation.data = []
        }
        let response = {}

        response.id = req.query.id
        response.room_type = roomTypeInformation.data
        response.name = roomInformation.data.name
        response.capacity = roomInformation.data.capacity
        response.width = roomInformation.data.width
        response.length = roomInformation.data.length
        response.is_visible = roomInformation.data.is_visible
        response.attribute = roomAttibuteInformation.data

        console.log("Success in get_room_information")
        res.send({
            status: 'success',
            data: response
        })
    },
    create_new_room: async (req, res) => {
        console.log("Start process create_new_room")
        let roomCreationResponse = await roomController.set_new_room(req, res)
        if (roomCreationResponse.data) {
            let newRoomId = roomCreationResponse.data.id
            for (let attribute of req.body.attribute) {
                await roomAttibuteController.set_room_attribute(newRoomId, attribute)
            }

            console.log("Success in create_new_room")
            res.send({
                status: 'success',
                data: 'Room created successfully'
            })
        }
        else {
            console.log("Error in create_new_room")
            res.send({
                status: 'error',
                error: {
                    code: "10853",
                    description: "Error when creating new room"
                }
            })
        }
    },
    edit_existing_room: async (req, res) => {
        console.log("Start process edit_existing_room")
        //await roomController.edit_existing_room(req, res)
        let savedAttributes = await roomAttibuteController.get_assigned_room_attibutes(req.body.id)
        let attributesToUpdate = []
        let attributesToInsert = []
        let attributesToDelete = []
        let idAffectedAttributes = []

        if (JSON.stringify(req.body.attribute) != JSON.stringify(savedAttributes.data)) {

            //Obtains attributes that need to be updated
            for (let editedAttribute of req.body.attribute) {
                for (let storedAttribute of savedAttributes.data) {
                    if ((editedAttribute.id_attribute == storedAttribute.id_attribute) && (editedAttribute.quantity != storedAttribute.quantity)) {
                        attributesToUpdate.push(editedAttribute)
                        idAffectedAttributes.push(editedAttribute.id_attribute)
                        let assignationResponse = await roomAttibuteController.get_room_attribute_assignation(req.body.id, editedAttribute.id_attribute)
                        await roomAttibuteController.edit_existing_room_attribute(assignationResponse.data.id, editedAttribute.quantity)
                        break
                    }
                }
            }


            for (let newAttribute of req.body.attribute) {
                //Obtains attributes that need to be created
                if (!JSON.stringify(attributesToUpdate).includes(JSON.stringify(newAttribute)) && !JSON.stringify(savedAttributes.data).includes(JSON.stringify(newAttribute))) {
                    attributesToInsert.push(newAttribute)
                    idAffectedAttributes.push(newAttribute.id_attribute)
                    await roomAttibuteController.set_room_attribute(req.body.id, newAttribute)
                }
                //Obtains attributes do not need to be created or modified
                else if (!JSON.stringify(attributesToUpdate).includes(JSON.stringify(newAttribute)) && JSON.stringify(savedAttributes.data).includes(JSON.stringify(newAttribute))) {
                    idAffectedAttributes.push(newAttribute.id_attribute)
                }
            }

            //Obtains attributes that need to be deleted
            for (let storedAttribute of savedAttributes.data) {
                if (!idAffectedAttributes.includes(storedAttribute.id_attribute)) {
                    attributesToDelete.push(storedAttribute)
                    let assignationResponse = await roomAttibuteController.get_room_attribute_assignation(req.body.id, storedAttribute.id_attribute)
                    await roomAttibuteController.delete_existing_room_attribute(assignationResponse.data.id)
                }
            }

        }

        console.log("Success in get_room_information")
        res.send({
            status: 'success',
            data: 'Success in editing room'
        })
    }
}