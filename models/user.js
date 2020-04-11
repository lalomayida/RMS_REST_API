class user {
    get_all_users() {
        return `SELECT id, expedient_number, password, name, surname, mail, is_visible FROM "user" `
    }
    get_visible_agents(){
        return `SELECT id, expedient_number, name, surname FROM "user" WHERE is_visible = true `
    }
    get_visible_users(){
        return `SELECT expedient_number FROM "user" WHERE is_visible = true `
    }
    get_user_password(expedientNumber) {
        return `SELECT expedient_number, password, is_visible FROM "user" where expedient_number =` + expedientNumber
    }
    get_user_information(idUser){
        return `SELECT id, expedient_number, name, surname, mail, is_visible FROM "user" WHERE id = `+idUser 
    }
    get_user_id(expedientNumber){
        return `SELECT id FROM "user" WHERE expedient_number = `+expedientNumber 
    }
    set_new_user(roleId, expedientNumber, password, name, surname, mail) {
        return `INSERT INTO "user" VALUES (default, ` + roleId + `,` + expedientNumber + `,'` + password + `','` + name + `','` + surname + `','` + mail + `',true)
        returning expedient_number`
    }
    edit_existing_user(roleId, expedientNumber, password, mail, isVisible) {
        return `UPDATE "user" SET role_id = '` + roleId + `',password='` + password + `', mail='` + mail + `', is_visible=` + isVisible + ` WHERE expedient_number =` + expedientNumber
    }
}

module.exports = user

