class requisition_need {
    get_all_requisition_needs() {
        return `SELECT id, name FROM requisition_need`
    }
    get_assigned_requisition_needs(idRequisition) {
        return `SELECT id_need, (SELECT name FROM requisition_need where id = id_need) as need_name, quantity FROM public.requisition_need_assignation WHERE id_requisition = ` + idRequisition
    }
    set_requisition_need(idRequisition, idNeed, quantity) {
        return `INSERT INTO public.requisition_need_assignation VALUES (default,` + idRequisition + `,` + idNeed + `,` + quantity + `) returning id`
    }
    edit_existing_requisition_need(idAssignation, idNeed, quantity) {
        return `UPDATE requisition_need_assignation SET quantity=` + quantity + ` WHERE id=` + idAssignation + ` AND id_need=` + idNeed
    }
    delete_existing_requisition_need(idAssignation) {
        return `DELETE FROM requisition_need_assignation WHERE id=` + idAssignation
    }
}

module.exports = requisition_need