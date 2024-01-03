const { AdminModel } = require('../../model/employee/adminModel')

async function AdminController(req, res) {

    try {
        const AdminData = await AdminModel();
        res.status(200).json({ AdminData })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = AdminController