const dbConfig = require("../../config/db.config")


async function SalesSearchModel(datas){

    const query = 'SELECT product, quantity, price, totalAmount, timeday FROM daily_sales WHERE product LIKE ? AND totalAmount LIKE ? AND username = ? ORDER BY timeday DESC'

    try {
        const [result] = await dbConfig.pool.execute(query, [datas.product, datas.totalAmount, datas.username])
        // console.log('RES', result)
        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }
}

async function AdminSalesSearchModel(datas){

    const query = 'SELECT * FROM daily_sales WHERE product LIKE ? AND totalAmount LIKE ? AND username LIKE ? ORDER BY timeday DESC'

    try {
        const [result] = await dbConfig.pool.execute(query, [datas.product, datas.totalAmount, datas.username])
        // console.log('RES', result)
        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }
}

module.exports = {SalesSearchModel, AdminSalesSearchModel}