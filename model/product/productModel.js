const dbConfig = require('../../config/db.config')
const { randNum } = require('../../helpers/randomNumbers')

async function GetAllProduct(product_name) {
    const sql = 'SELECT * FROM product WHERE product_name = ?'
    try {
        const [getProducts] = await dbConfig.pool.execute(sql, [product_name])
        if (getProducts.length > 0) {
            return getProducts
        } else {
            return null
        }
    } catch (error) {
        throw error
    }

}
async function UpdateQuantity(currentQuantity, prodName) {
    const sql = 'UPDATE product SET product_quantity_left = ? WHERE product_name = ?'

    try {
        const [updatePQ] = await dbConfig.pool.execute(sql, [currentQuantity, prodName])
        // Check if the update was successful
        if (updatePQ.affectedRows > 0) {
            // console.log(`Quantity updated successfully for ${prodName}`);
            return true; // Return a success indicator if needed
        } else {
            // console.log(`No rows were updated for ${prodName}`);
            return false; // Return a failure indicator if needed
        }
    } catch (error) {
        throw error
    }
}
async function CreateProductModel(productData) {
    const { product_name,
        product_quantity,
        product_price,
        product_quantity_left } = productData
    const product_id = randNum
    try {
        const checkData = `SELECT COUNT(*) AS count FROM product WHERE product_name = ?`

        const [checkProductExist] = await dbConfig.pool.execute(checkData, [product_name])
        if (checkProductExist[0].count > 0) {
            return { message: false, message: 'Entry with the same name already exists' }

        } else {
            const metadata = [product_id, product_name, product_quantity, product_price, product_quantity_left]
            const sql = `INSERT INTO product(product_id, product_name, product_quantity, product_price, product_quantity_left) VALUES (?,?,?,?,?)`
            const [rows] = await dbConfig.pool.execute(sql, metadata)

            if (rows.affectedRows === 1) {
                return { success: true, insertId: rows.insertId }
            } else {
                return { success: false, message: "Error inserting Data" }
            }
        }
    } catch (error) {
        if (error.errno === 1062 && error.code === 'ER_DUP_ENTRY') {

            console.log('Duplicate entry', error)
            throw new Error('Duplicate entry for Product ID')

        } else {
            console.log('Internal Server error', error)
            throw error;
        }
    }
}

module.exports = { CreateProductModel, GetAllProduct, UpdateQuantity }