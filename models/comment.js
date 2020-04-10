class comment {
    get_requisition_comments(idRequisiton) {
        return `SELECT id, id_user, comment, submit_date FROM comment WHERE id_requisiton=` + idRequisiton
    }
    set_requisition_comment(idUser, comment, idRequisiton) {
        return `INSERT INTO comment VALUES (default,` + idUser + `,` + comment + `,current_time,` + idRequisiton + `)`
    }
}

module.exports = comment