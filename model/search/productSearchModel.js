const dbConfig = require("../../config/db.config")

async function ProductSearchModel(data) {
    const query = 'SELECT * FROM product WHERE product_name LIKE ?'
    try {
        const [result] = await dbConfig.pool.execute(query, [data])
        // console.log(result)
        return result.length > 0 ? result : null
    } catch (error) {
        throw error
    }

}

module.exports = ProductSearchModel