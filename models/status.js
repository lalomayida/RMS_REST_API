class status {
    get_status() {
        return `SELECT id, name FROM status`
    }
    get_requisition_status(idStatus) {
        return `SELECT id, name FROM status WHERE id = ` + idStatus
    }
}

module.exports = status