const dbConfig = require("../../config/db.config")



async function DeleteSoldItemModel(product_uuid) {
    const query = 'DELETE FROM daily_sales where product_uuid = ?'

    try {
        const [result] = await dbConfig.pool.execute(query, [product_uuid])
        return result.affectedRows > 0 ? result : null
    } catch (error) {
        throw error
    }
}

module.exports = DeleteSoldItemModel