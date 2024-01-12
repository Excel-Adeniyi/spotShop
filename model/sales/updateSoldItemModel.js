const dbConfig = require("../../config/db.config")


async function UpdateSoldItemsModel(data) {
    const query = 'UPDATE spotshop.daily_sales SET product = ?, quantity = ?, price = ?, totalAmount = ?, timeday = ?, updated = ? WHERE product_uuid = ? '
    try {
        const [result] = await dbConfig.pool.execute(query, data)
        return result.affectedRows > 0 ? result : null
    } catch (error) {
        console.log('ERRR', error.message)
        throw error
    }

}

module.exports = UpdateSoldItemsModel