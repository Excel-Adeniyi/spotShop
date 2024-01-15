const dbConfig = require("../../config/db.config")


async function saveDeletedItemsModel(product, quantity, price, totalAmount, username){
    // console.log(data)
    const query = 'INSERT INTO deleted_sales (product, quantity, price, totalAmount, username) VALUES (?,?,?,?,?)'
    try {
        const [result] = await dbConfig.pool.execute(query, [product, quantity, price, totalAmount, username])
        return result.affectedRows > 0 ? result : null 
    } catch (error) {
        throw error
    }
}

module.exports =  saveDeletedItemsModel