const dbConfig = require('../../config/db.config')
const UUID = require('../../helpers/uuid')

async function createSalesModel(data) {
    try {
        const sql = 'INSERT INTO daily_sales (product, quantity, price, totalAmount, username, product_uuid) VALUES (?,?,?,?,?, ?)'
        const [rows, fields] = await dbConfig.pool.execute(sql, [...Object.values(data)])

        if (rows.affectedRows === 1) {
            console.log('Product created Successfully')
            console.log(rows)
            return { success: true, rows: rows.insertId }
        } else {
            console.log('Failed to create a sales record.');
            return { error: false, rows: rows.insertId }// You can return false or any relevant error indicator.
        }

    }
    catch (error) {
        if (error.errno === 1062 && error.code === 'ER_DUP_ENTRY') {

            console.log('Duplicate entry', error)
            throw new Error('Duplicate entry for Product ID')

        } else {
            console.log('Internal Server error', error)
            throw error;
        }
    }
}

async function ListDailySales() {
    const query = 'SELECT * FROM spotshop.daily_sales WHERE DATE(timeday)= CURDATE() '
    try {
        const [result] = await dbConfig.pool.execute(query)
        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }
}


async function ListSaleByDate(date1, date2) {
    const query = 'SELECT * FROM spotshop.daily_sales WHERE timeday BETWEEN ? AND ?'
    const date = [date1, date2]
    try {
        const [result] = await dbConfig.pool.execute(query, date)
        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }
}

module.exports = { createSalesModel, ListDailySales, ListSaleByDate }