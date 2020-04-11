class department {
    get_all_departments() {
        `SELECT id, "name" FROM department`
    }
    get_department_information(idDepartment) {
        return `SELECT id, "name" FROM department where id = ` + idDepartment
    }
}
module.exports = department