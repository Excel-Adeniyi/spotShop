const dbConfig = require('../config/db.config')

async function checkUserCredentials(username, password) {
    try {
        const [rows, field] = await dbConfig.pool.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
        return rows.length > 0 ? rows : rows = null;
    } catch (err) {
        console.log(err)
    }
}

async function createUserAccont(user_id, username, password) {
    console.log(username, password)
    try {
        const sql = `INSERT INTO users(user_id, username, password) VALUES (?,?,?)`
        const data = [user_id, username, password]
        const [insertData] = await dbConfig.pool.execute(sql, data)
        return insertData.affectedRows === 1 ? insertData : null

    } catch (error) {
        console.log(error)
        throw error
    }
}
module.exports = { checkUserCredentials, createUserAccont }