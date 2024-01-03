const dbConfig = require('../../config/db.config')


async function AdminModel() {
    try {
        const sql = 'SELECT admin.*, users.*, regional_manager.* FROM admin INNER JOIN users ON admin.user_id = users.user_id INNER JOIN regional_manager ON admin.rmanager_id = regional_manager.rmanager_id'
        const [rows, fields] = await dbConfig.pool.execute(sql)

        return rows.length > 0 ? rows : rows = null
    } catch (error) {
        console.log(error)
    }

}

async function AdminDataModel(user_id) {

    try {
        const sql = `SELECT * FROM admin WHERE user_id = ?`
        const [rows] = await dbConfig.pool.execute(sql, [user_id])

        if (rows === null || rows === undefined) {
            return null;
        }
        return rows.length > 0 ? rows : 0;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { AdminModel, AdminDataModel }