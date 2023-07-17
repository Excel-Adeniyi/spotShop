const db = require('../config/db.config')

async function checkUserCredentials(username, password) {
    try {
        const [rows, field] = await db.pool.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password])
        return rows.length > 0;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { checkUserCredentials }