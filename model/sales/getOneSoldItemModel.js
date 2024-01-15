const dbConfig = require("../../config/db.config")


async function GetOneSoldItemModel(uuid) {
    const query = 'SELECT * FROM daily_sales WHERE product_uuid = ?'
    try {
        const [result] = await dbConfig.pool.execute(query, [uuid])

        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }
}

module.exports = GetOneSoldItemModel