const { randNum } = require('../../helpers/randomNumbers')
const dbConfig = require('../../config/db.config')

async function createBranchModel(branchData) {
    const { branch_location, branch_name } = branchData


    try {
        const checkBranchExist = `SELECT COUNT(*) AS count FROM spotshop.branch WHERE branch_name = ? `
        console.log('EEEE', branch_name)

        const [checkExistResult] = await dbConfig.pool.execute(checkBranchExist, [`${branch_name}`])
        

        if (checkExistResult[0].count > 0) {
            console.log('DDDDD', checkExistResult.count)

            return { success: false, message: 'Entry with the same location and name already exists' }


        } else {

            const branch_id = randNum
            console.log('SSSSS', branch_id)
            const values = [branch_id, branch_location, branch_name]
            const sql = `INSERT INTO branch(branch_id, branch_location, branch_name) VALUES (?,?,?)`
            const [insertBranch] = await dbConfig.pool.execute(sql, values)


            if (insertBranch.affectedRows === 1) {
                return { success: true, insertId: insertBranch.insertId }
            }
            else {
                return { success: false, message: 'Error in inserting data' }
            }
        }
    } catch (error) {

        if (error.errno === 1062 && error.code === 'ER_DUP_ENTRY') {

            console.log('Duplicate entry', error)
            throw new Error('Duplicate entry for branch ID')

        } else {
            console.log('Internal Server error', error)
            throw error;
        }

    }
}

module.exports = { createBranchModel }