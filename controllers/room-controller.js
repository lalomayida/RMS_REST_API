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
                    console.log("No visible rooms, error retreiving get_visible_rooms")
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
    set_new_room: (req, res) => {
        conn.query(querySelector.set_new_room(req.body.idRoomType, req.body.roomName, req.body.capacity, req.body.width, req.body.length),
            (error, result) => {
                if (error) {
                    console.log("Error in set_new_user")
                    res.send({
                        status: 'error',
                        error: error
                    })
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
    edit_existing_room: (req, res) => {
        conn.query(querySelector.edit_existing_room(req.body.idRoom, req.body.capacity, req.body.width, req.body.length, req.body.isVisible),
            (error, result) => {
                if (error) {
                    console.log("Error in edit_existing_room")
                    res.send({
                        status: 'error',
                        error: error
                    })
                }
                else {
                    console.log("Success in edit_existing_room")
                    res.send({
                        status: 'success',
                        despription: 'Room edited successfully'
                    })
                }
            }
        )
    },
}
