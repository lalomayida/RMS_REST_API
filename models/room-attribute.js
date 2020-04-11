class room_attibute {
    get_all_room_attributes() {
        return `SELECT id, name FROM public.room_attribute`
    }
    get_assigned_room_attibutes(idRoom) {
        return `SELECT id_attribute, (SELECT name FROM room_attribute where id = id_attribute), quantity FROM public.room_attribute_assignation WHERE id_room = ` + idRoom
    }
    get_room_attribute_assignation(idRoom, idAttribute){
        return `SELECT id FROM room_attribute_assignation WHERE id_room = ` + idRoom +` AND id_attribute =`+idAttribute
    }
    set_room_attribute(idRoom, idAttribute, quantity) {
        return `INSERT INTO room_attribute_assignation VALUES (default,` + idRoom + `,` + idAttribute + `,` + quantity + `)`
    }
    edit_existing_room_attribute(idAssignation, quantity) {
        return `UPDATE room_attribute_assignation SET quantity=` + quantity + ` WHERE id=` + idAssignation 
    }
    delete_existing_room_attribute(idAssignation) {
        return `DELETE FROM room_attribute_assignation WHERE id=` + idAssignation
    }
}

module.exports = room_attibute