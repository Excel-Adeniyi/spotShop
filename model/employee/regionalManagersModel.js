const dbConfig = require('../../config/db.config')


async function RegionalManager(rmanagerData) {
    const { rmanager_id, rmanager_name, rmanager_email, rmanager_phone, rmanager_location } = rmanagerData;
    console.log(rmanagerData)
    try {
        const rbodies = [rmanager_id, rmanager_name, rmanager_email, rmanager_phone, rmanager_location];
        const sql = `INSERT INTO regional_manager(rmanager_id, rmanager_name, rmanager_email, rmanager_phone, rmanager_location) VALUES (?,?,?,?,?)`;
        const [insertedRegionalManager] = await dbConfig.pool.execute(sql, rbodies);


        return insertedRegionalManager.affectedRows === 1 ? insertedRegionalManager : null

    } catch (error) {
        console.error('Error creating regional manager record:', error);

        throw error;
    }
}

async function RegionalManagerDataModel(user_id) {
    try {
        const sql = `SELECT * FROM regional_manager WHERE user_id = ?`
        const [rows] = await dbConfig.pool.execute(sql, [user_id])

        return rows.length > 0 ? rows : 0
    } catch (error) {
        console.log(error)
        return { message: "Internal server error" }
    }
}

module.exports = { RegionalManager, RegionalManagerDataModel }