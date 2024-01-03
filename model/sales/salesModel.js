const dbConfig = require("../../config/db.config");


async function TotalSalesMade(){
    try{
        const [rows, field] = await dbConfig.pool.execute('SELECT amount FROM sales')
        return rows.length > 0 ? rows : null
    } catch (err){
        console.log(err)
    }
}

module.exports = {TotalSalesMade}