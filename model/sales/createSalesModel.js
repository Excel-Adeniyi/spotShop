const dbConfig = require('../../config/db.config')

async function createSalesModel(product, quantity, price, totalAmount, timestamp) {

    try {
        const sql = 'INSERT INTO daily_sales (product, quantity, price, totalAmount, timestamp) VALUES (?,?,?,?, ?)'
        const [rows, fields] = await dbConfig.pool.execute(sql, [product, quantity, price, totalAmount, timestamp])

        if (rows.affectedRows === 1) {
            console.log('Product created Successfully')
            return true
        } else {
            console.log('Failed to create a sales record.');
            return false; // You can return false or any relevant error indicator.
        }

    }
    catch (e) {
        console.log('Internal server error in creating Product', e);
        return false
    }
}

module.exports = { createSalesModel }