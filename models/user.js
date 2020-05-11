class user {
    get_all_users() {
        return `SELECT id, expedient_number , name, surname , mail, is_visible FROM "user" ORDER BY expedient_number asc `
    }
    get_visible_agents() {
        return `SELECT id, concat (expedient_number,' - ',name,' ',surname) FROM "user" WHERE is_visible = true AND role_id in (2,3)`
    }
    get_visible_users() {
        return `SELECT id, concat (expedient_number,' - ',name,' ',surname) FROM "user" WHERE is_visible = true `
    }
    get_user_token(email, password) {
        return `SELECT expedient_number, password, is_visible FROM "user" WHERE mail ='` + email + `' AND password = '` + password + `'`
    }
    get_user_role(idUser) {
        return `SELECT id, name FROM "role" where id = (SELECT role_id FROM "user" where id =` + idUser + `)`
    }
    get_user_information(idUser) {
        return `SELECT id, expedient_number, password, name, surname, mail, is_visible FROM "user" WHERE id = ` + idUser
    }
    get_user_id(expedientNumber) {
        return `SELECT id FROM "user" WHERE expedient_number = ` + expedientNumber
    }
    get_user_id_email(email) {
        console.log(email)
        return `SELECT id FROM "user" WHERE mail = '` + email + `'`
    }
    set_new_user(roleId, expedientNumber, password, name, surname, mail) {
        return `INSERT INTO "user" VALUES (default, ` + roleId + `,` + expedientNumber + `,'` + password + `','` + name + `','` + surname + `','` + mail + `',true)
        returning expedient_number`
    }
    edit_existing_user(roleId, expedientNumber, name, surname, password, mail, isVisible) {
        return `UPDATE "user" SET role_id = '` + roleId + `',name='` + name + `',surname='` + surname + `',password='` + password + `', mail='` + mail + `', is_visible=` + isVisible + ` WHERE expedient_number =` + expedientNumber
    }
}

module.exports = user

