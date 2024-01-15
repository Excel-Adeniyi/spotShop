const CookieHelper = require("../../helpers/cookieHelper")
const { SalesSearchModel, AdminSalesSearchModel } = require("../../model/search/salesSearchModel")
const jwt = require("jsonwebtoken");


async function SalesSearch(req, res) {
    const { product } = req.body
    const jwtToken = await CookieHelper(req)
    let checkTokenValidation
    if (jwtToken !== undefined) {
        checkTokenValidation = jwt.verify(jwtToken, process.env.JWT_SECRET)
    }
    // Split the string by spaces
    let splittedString = product.split(',').map(pair => pair.trim())
    let data = {}
    for (convert of splittedString) {
        let [key, value] = convert.split(':').map(pair => pair.trim())

        data[key] = value

    }

    try {

        const datas = {
            product: `%${data.product || ""}%`,
            totalAmount: `%${data.total || ""}%`,
            username: checkTokenValidation.username
        }
        // console.log('DS', datas)
        if (datas.product !== undefined || datas.totalAmount !== undefined) {
            const result = await SalesSearchModel(datas)

            if (result !== undefined) {
                res.status(200).json({ success: result })
            } else {
                res.status(200).json({ error: "unable to get data" })
            }
        } else {
            res.status(500).json({ message: "Data wrongfully entered, ensure comma is present" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

async function AdminSalesSearch(req, res) {
    const { product } = req.body

    // Split the string by spaces
    let splittedString = product.split(',').map(pair => pair.trim())
    let data = {}
    for (convert of splittedString) {
        let [key, value] = convert.split(':').map(pair => pair.trim())

        data[key] = value

    }

    try {

        const datas = {
            product: `%${data.product || ""}%`,
            totalAmount: `%${data.total || ""}%`,
            username: `%${data.user || ""}%`
        }
        // console.log('DS', datas)
        if (datas.product !== undefined || datas.totalAmount !== undefined) {
            const result = await AdminSalesSearchModel(datas)

            if (result !== undefined) {
                res.status(200).json({ success: result })
            } else {
                res.status(200).json({ error: "unable to get data" })
            }
        } else {
            res.status(500).json({ message: "Data wrongfully entered, ensure comma is present" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

module.exports = { SalesSearch, AdminSalesSearch }