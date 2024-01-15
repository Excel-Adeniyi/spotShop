const dbConfig = require('../../config/db.config')

async function CreateStaffModel() {
    const connection = await dbConfig.pool.getConnection()
    try {
        const staffdata = [staff_id, staff_name, staff_email, staff_address, selectbranchIdResult]
        const staffInfo = `INSERT INTO staff(staff_id, staff_name, staff_email, staff_address, branch_id) VALUES (?,?,?,?,?)`
        const [staffinfoResult] = await connection.execute(staffInfo, staffdata)
        
        return  staffinfoResult.affectedRows !== 0 ? staffinfoResult : null
    } catch (error) {
        console.log(error)
        throw error
    }
}