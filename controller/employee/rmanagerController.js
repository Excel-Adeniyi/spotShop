const regionalManagersModel = require('../../model/employee/regionalManagersModel')
const { createUserAccont } = require('../../model/userModel')


async function RegionalManagerController(req, res) {

    const rmanagerData = req.body
    const username = rmanagerData.username
    const user_id = rmanagerData.user_id
    const password = rmanagerData.password
    try {
        const userCreate = await createUserAccont(user_id, username, password)
        if (userCreate.success) {
            console.log("SSSSS",userCreate)
            const result = await regionalManagersModel.RegionalManager(rmanagerData)

            if (result.success) {
                res.status(201).json({ message: 'Regional manager record created successfully', insertedId: result.insertId })
            } else {
                res.status(500).json({ message: result.message })
            }
        }else{
            res.status(500).json({message: userCreate.message})
        }
    } catch (error) {
        console.log('Error in regional Manager controller:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = RegionalManagerController