const dbConfig = require('../../config/db.config')

async function SaveToken(data) {
    const sqlQuery = "INSERT INTO token(token, username, createAt) VALUES(?, ?, ?)"
    const {jwtToken, username} = data
    const date = new Date()
    console.log(jwtToken)
    console.log(date)
    try {
        const [rows] = await dbConfig.pool.execute(sqlQuery, [jwtToken, username, date ])
        return rows.affectedRows !== 0 ? rows : null
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function CheckTokens(tokenId) {
    const sqlQuery = "SELECT * FROM spotshop.token where id=?"
    const Id = tokenId
    try {
        const [rows] = await dbConfig.pool.query(sqlQuery, Id)
        return rows.affectedRows !== 0 ? rows : null 
 
    } catch (error) {
        console.log("CheckTokens", error)
        throw error
    }
}

module.exports = {SaveToken, CheckTokens}