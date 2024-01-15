const dbConfig = require("../../config/db.config")


async function DeleteProductModel(product_id){
    const query = 'DELETE FROM product WHERE product_id = ?'

    try {
        const [result] = await dbConfig.pool.execute(query, [product_id])
        return result.affectedRows > 0 ? result : null
    } catch (error) {
        console.log('ERROr', error)
        throw error
    }
}

module.exports = DeleteProductModel