const dbConfig = require("../../config/db.config")


async function UpdateProductModel(data){
    const query = 'UPDATE spotshop.product SET product_name = ?, product_quantity = ?, product_price = ?, product_quantity_left = ? WHERE product_id = ?'
    try {
        const [result] = await dbConfig.pool.execute(query, data)
        return result.affectedRows > 0 ? result : null
    } catch (error) {
        console.log('Error: ', error);
        throw error
    }
}

module.exports = UpdateProductModel