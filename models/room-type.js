class room_type {
    get_room_type_information(idRoom) {
        return `SELECT id, "name" FROM room_type WHERE id = (SELECT id_room_type FROM room WHERE id = ` + idRoom + `)`
    }
    get_room_types() {
        return `SELECT id, name FROM room_type`
    }
}

module.exports = room_type