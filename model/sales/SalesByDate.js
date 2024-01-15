const dbConfig = require("../../config/db.config")



async function GetSalesByDate(data){
    const query = 'SELECT * FROM daily_sales WHERE username = ? AND timeday BETWEEN ? AND ?'
    console.log(data)
    try {
        const [result] = await dbConfig.pool.execute(query, data)
        console.log(result)
        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }
}

module.exports = GetSalesByDate