const dbConfig = require('../../config/db.config')

async function SaveToken(data) {
    const sqlQuery = "INSERT INTO token(token, username, createAt) VALUES(?, ?, ?)"
    const {jwtToken, username, expirationDate} = data
    // const date = new Date()
    // console.log(jwtToken)
    // console.log(date)
    try {
        const [rows] = await dbConfig.pool.execute(sqlQuery, [jwtToken, username, expirationDate ])
        console.log('Affected', rows  )
        return rows.affectedRows > 0 ? rows : row === null
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function CheckTokens(authtoken) {
    const sqlQuery = "SELECT * FROM spotshop.token where token=?"
    const token = authtoken
    try {
        const [rows] = await dbConfig.pool.query(sqlQuery, token)
        return rows.affectedRows !== 0 ? rows : null 
 
    } catch (error) {
        console.log("CheckTokens", error)
        throw error
    }
}

module.exports = {SaveToken, CheckTokens}