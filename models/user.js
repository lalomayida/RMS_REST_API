class user {
    get_all_users() {
        return `SELECT id, expedient_number, password, name, surname, mail, is_visible FROM "user"`
    }
    get_user_password(expedientNumber) {
        return `SELECT user, password FROM "user" where expedient_number =` + expedientNumber
    }
    set_new_user(roleId, expedientNumber, password, name, surname, mail) {
        return `INSERT INTO "user" VALUES (default, ` + roleId + `,` + expedientNumber + `,'` + password + `','` + name + `','` + surname + `','` + mail + `',true)
        returning expedient_number`
    }
    edit_existing_user(roleId, expedientNumber, password, mail) {
        return `UPDATE "user" SET role_id = '` + roleId + `',password='` + password + `', mail='` + mail + `' WHERE expedient_number =` + expedientNumber
    }
}

module.exports = user

