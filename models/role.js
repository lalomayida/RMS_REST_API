class role {
    get_all_roles(){
        return `SELECT id, role_description FROM "role"`
    }
}

module.exports = role