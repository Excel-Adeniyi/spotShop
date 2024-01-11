const dbConfig = require("../../config/db.config");


async function ListCloseBook() {
    try {
        const [rows, field] = await dbConfig.pool.execute('SELECT * FROM spotshop.`end_of_day_accounts`')
        return rows.length > 0 ? rows : null
    } catch (err) {
        console.log(err)
    }
}

async function ClosingBook() {
    try {
        const sql = "SELECT SUM(quantity) AS total_quantity, SUM(totalAmount) AS total_sales FROM spotshop.`daily_sales` WHERE DATE(timeday) = CURDATE()"

        const [results] = await dbConfig.pool.execute(sql);
        return results.length > 0 ? results : nu
    } catch (error) {
        console.log(error)
        throw error
    }

}

async function StoreClosingBook(data) {
    try {
        console.log('INSERT', data)
        const end_day_account = "INSERT INTO spotshop.`end_of_day_accounts` (username, total_quantity, total_sales) VALUES (?,?,?)"
        const [results] = await dbConfig.pool.execute(end_day_account, [data.username, data.total_quantity, data.total_sales])
        return results.length > 0 ? results : null
    } catch (error) {
        console.log(error)
        throw error
    }


}
module.exports = { ListCloseBook, ClosingBook, StoreClosingBook }