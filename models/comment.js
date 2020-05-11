class comment {
    get_requisition_comments(idRequisition) {
        return `SELECT id_user, comment, submit_date FROM comment WHERE id_requisiton=` + idRequisition
    }
    set_requisition_comment(idUser, comment, idRequisition) {
        return `INSERT INTO comment VALUES (default,` + idUser + `,'` + comment + `',NOW(),` + idRequisition + `)`
    }
}

module.exports = comment