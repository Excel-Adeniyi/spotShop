const dbConfig = require("../../config/db.config")



async function GetDeletedItems(date1, date) {
    const query = 'SELECT * FROM deleted_sales WHERE timeday BETWEEN ? and ? '

    try {
        const [result] = await dbConfig.pool.execute(query, [date1, date])
        return result.affectedRows > 0 ? result : null
    } catch (error) {
        throw error
    }
}

module.exports = GetDeletedItems