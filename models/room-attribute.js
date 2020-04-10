class room_attibute {
    get_all_room_attributes() {
        return `SELECT id, name FROM public.room_attribute`
    }
    get_assigned_room_attibutes(idRoom) {
        return `SELECT id, id_attribute, quantity FROM public.room_attribute_assignation WHERE id_room = ` + idRoom
    }
    set_room_attribute(idRoom, idAttribute, quantity) {
        return `INSERT INTO room_attribute_assignation VALUES (default,` + idRoom + `,` + idAttribute + `,` + quantity + `)`
    }
}

module.exports = room_attibute