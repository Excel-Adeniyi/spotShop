const dbConfig = require('../../config/db.config')

async function CreateStaffModel() {
    const connection = await dbConfig.pool.getConnection()
    try {
        const selectbranchId = `SELECT branch_id FROM branch WHERE branch_name = ?`
        const selectbranchIdResult = await connection.execute(selectbranchId, [branch_name])
        const staffdata = [staff_id, staff_name, staff_email, staff_address, selectbranchIdResult]
        const staffInfo = `INSERT INTO spotshop.staff(staff_id, staff_name, staff_email, staff_address, branch_id) VALUES (?,?,?,?,?)`
        const [staffinfoResult] = await connection.execute(staffInfo, staffdata)
        if(staffinfoResult.affectedRows){
            return {}
        }
        return 
    } catch (error) {

    }
}