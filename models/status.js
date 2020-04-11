class status {
    get_status_when_open() {
        return `SELECT id, name FROM status WHERE id in (1,2)`
    }
    get_status_when_in_progress() {
        return `SELECT id, name FROM status WHERE id in (2,3,4)`
    }
    get_status_when_approved() {
        return `SELECT id, name FROM status WHERE id in (3)`
    }
    get_status_when_rejected() {
        return `SELECT id, name FROM status WHERE id in (4)`
    }
    get_requisition_status(idStatus) {
        return `SELECT id, name FROM status WHERE id = ` + idStatus
    }
}

module.exports = status