const dbConfig = require('../config/db.config')

async function CheckUserCredentials(username, password) {
    console.log('Model Data',username, password)
    try {
        const [rows] = await dbConfig.pool.execute('SELECT * FROM spotshop.users WHERE username = ? AND password = ?', [username, password])
        console.log(rows)
        return rows.affectedRows !== 0 ? rows :  null;
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function createUserAccont(username, password, role) {
    console.log(username, password, role)
    try {
        const sql = `INSERT INTO users(username, password, role) VALUES (?,?,?)`
        const data = [username, password, role]
        const [insertData] = await dbConfig.pool.execute(sql, data)
        return insertData.affectedRows === 1 ? insertData : null

    } catch (error) {
        console.log(error)
        throw error
    }
}
module.exports = { CheckUserCredentials, createUserAccont }