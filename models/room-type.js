class room_type {
    get_room_type_information(idType) {
        return `SELECT id, "name" FROM room_type WHERE id =` + idType
    }
    get_room_types() {
        return `SELECT id, id_room_type, name, capacity, width, length, is_visible FROM room`
    }
}

module.exports = room_type