class role {
    get_all_roles(){
        return `SELECT id, name FROM "role" ORDER BY id asc` 
    }
}

module.exports = role