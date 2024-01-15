const dbConfig = require("../../config/db.config");


async function ListCloseBook() {
    try {
        const [rows, field] = await dbConfig.pool.execute('SELECT * FROM end_of_day_accounts')
        return rows.length > 0 ? rows : null
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function ClosingBook() {
    try {
        const sql = "SELECT SUM(quantity) AS total_quantity, SUM(totalAmount) AS total_sales FROM daily_sales WHERE DATE(timeday) = CURDATE()"

        const [results] = await dbConfig.pool.execute(sql);
        return results.length > 0 ? results : null
    } catch (error) {
        console.log(error)
        throw error
    }

}
async function GetStoredBooks(username) {
    try {
        const sql = "SELECT * FROM end_of_day_accounts WHERE username = ? AND DATE(date) = CURDATE()"
        const [results] = await dbConfig.pool.execute(sql, [username]);
        // console.log(results)
        return results !== undefined ? results : null
    } catch (error) {
        throw error
    }
}

async function StoreClosingBook(data) {
    try {
        // console.log('INSERT', data)
        const end_day_account = "INSERT INTO end_of_day_accounts (username, total_quantity, total_sales) VALUES (?,?,?)"
        const [results] = await dbConfig.pool.execute(end_day_account, [data.username, data.total_quantity, data.total_sales])
        return results.length > 0 ? results : null
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function UpdateClosingBook(data) {
    // console.log(data)
    try {
        console.log('INSERT', data)
        const end_day_account = "UPDATE end_of_day_accounts SET total_quantity = ?, total_sales = ? WHERE username = ? AND DATE(date) = CURDATE()"
        const [results] = await dbConfig.pool.execute(end_day_account, [data.total_quantity, data.total_sales, data.username])
        console.log(results)
        return results.affectedRows > 0 ? results : null
    } catch (error) {
        console.log(error)
        throw error
    }
}
module.exports = { ListCloseBook, ClosingBook, StoreClosingBook, GetStoredBooks, UpdateClosingBook }