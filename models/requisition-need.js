class requisition_need {
    get_all_requisition_needs() {
        return `SELECT id, name FROM requisition_need`
    }
    get_assigned_requisition_needs(idRequisition) {
        return `SELECT id, id_need, quantity FROM public.requisition_need_assignation WHERE id_requisition = ` + idRequisition
    }
    set_requisition_need(idRequisition, idNeed, quantity) {
        return `INSERT INTO public.requisition_need_assignation VALUES (default,` + idRequisition + `,` + idNeed + `,` + quantity + `)`
    }
}

module.exports = requisition_need