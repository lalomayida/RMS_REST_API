class comment {
    get_requisition_comments(idRequisition) {
        return `SELECT (SELECT concat(name,' ', surname) FROM "user" where id = id_user) as author, comment, submit_date FROM comment WHERE id_requisiton=` + idRequisition
    }
    set_requisition_comment(idUser, comment, idRequisition) {
        return `INSERT INTO comment VALUES (default,` + idUser + `,'` + comment + `',NOW(),` + idRequisition + `)`
    }
}

module.exports = comment