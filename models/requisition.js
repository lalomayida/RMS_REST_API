class requisition {
    get_admin_requisitions(idAgent) {
        return `SELECT id, id_room, id_user, initial_date, final_date, description, id_status, id_department FROM requisition WHERE id_agent = ` + idAgent
    }
    get_user_requisitions(expedientNumber) {
        return `SELECT id, id_room, initial_date, final_date, description, id_status, id_department, id_agent FROM requisition WHERE  id_user = ` + expedientNumber
    }
    get_requisition_information(idRequisition){
        return `SELECT id_room, id_user, id_agent, initial_date, final_date, description, id_status, id_department FROM requisition WHERE id = ` + idRequisition
    }
    set_new_requisition(idRoom, idUser, initialDate, finalDate, description, idAgent, idDepartment) {
        return `INSERT INTO requisition VALUES (default,` + idRoom + `,` + idUser + `,'` + initialDate + `','` + finalDate + `','` + description + `',1,` + idAgent + `,`+idDepartment+`)
        returning id`
    }
    edit_requisition_status(idRequisition, idStatus) {
        return `UPDATE requisition SET id_status=` + idStatus + ` WHERE id =` + idRequisition
    }

    edit_requisition_agent(idRequisition, idAgent) {
        return `UPDATE requisition SET id_agent = (SELECT id FROM "user" WHERE expedient_number =` + idAgent + `) WHERE id =` + idRequisition
    }
}

module.exports = requisition