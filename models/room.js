class room {
    get_all_rooms() {
        return `SELECT id, id_room_type, name, capacity, width, length, is_visible FROM room ORDER BY id asc `
    }
    get_visible_rooms() {
        return `SELECT id, id_room_type, name, capacity, width, length FROM room WHERE is_visible = true`
    }
    get_room_information(idRoom){
        return `SELECT id, id_room_type, name, capacity, width, length, is_visible FROM room where id = `+idRoom
    }
    set_new_room(idRoomType, roomName, capacity, width, length) {
        return `INSERT INTO room VALUES (default, ` + idRoomType + `,'` + roomName + `',` + capacity + `,` + width + `,` + length + `,true) returning id`
    }
    edit_existing_room(idRoom, capacity, isVisible) {
        return `UPDATE room SET capacity=` + capacity + `, is_visible=` + isVisible + ` WHERE id =` + idRoom
    }
}

module.exports = room