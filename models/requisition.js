class requisition {
    get_admin_requisitions(idAgent) {
        return `SELECT id, id_room, id_user, initial_date, final_date, description, id_status FROM requisition where id_agent = ` + idAgent
    }
    set_new_requisition(idRoom, idUser, initialDate, finalDate, description, idAgent) {
        return `INSERT INTO requisition VALUES (default,` + idRoom + `,` + idUser + `,` + initialDate + `,` + finalDate + `,'` + description + `',1,` + idAgent + `)
        returning id`
    }
    edit_requisition_status(idRequisition, idStatus) {
        return `UPDATE requisition id_status=` + idStatus + ` WHERE id =` + idRequisition
    }

    edit_requisition_agent(idRequisition, idAgent) {
        return `UPDATE requisition id_agent=` + idAgent + ` WHERE id =` + idRequisition
    }
}

module.exports = requisition