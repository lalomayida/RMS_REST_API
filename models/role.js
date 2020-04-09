class role {
    get_all_roles(){
        return `SELECT id, name FROM "role"`
    }
}

module.exports = role