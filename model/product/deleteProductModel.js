const dbConfig = require("../../config/db.config")


async function DeleteProductModel(){
    const query = 'DELETE FROM spotshop.product WHERE product_id = ?'

    try {
        const [result] = await dbConfig.pool.execute(query, product_id)
        return result.affectedRows > 0 ? result : null
    } catch (error) {
        console.log('ERROr', error)
        throw error
    }
}