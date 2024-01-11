const dbConfig = require("../../config/db.config")



async function GetSalesByDate(data){
    const query = 'SELECT * FROM spotshop.daily_sales WHERE username = ? AND timeday BETWEEN ? AND ?'
    try {
        const [result] = await dbConfig.pool.execute(query, data)

        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }
}

module.exports = GetSalesByDate