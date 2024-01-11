const CookieHelper = require("../../helpers/cookieHelper")
const { CreateProductModel } = require("../../model/product/productModel")
const jwt = require("jsonwebtoken");
const { CheckTokens } = require("../../model/saveToken/saveToken");


async function createProductController(req, res) {
    const productData = req.body

    try {
        const jwtToken = await CookieHelper(req)
        if (jwtToken !== null) {
            const checkTokenValidation = jwt.verify(jwtToken, process.env.JWT_SECRET)
            if (!checkTokenValidation) {
                res.status(401).json({ error: 'Unauthorized access' })
            } else {
                const rowsData = await CheckTokens(jwtToken)
                rowsData.forEach(async (data) => {
                    const date = new Date()
                    const expireTime = data.createAt

                    if (date < expireTime) {
                        const result = await CreateProductModel(productData)
                        if (result.success) {
                            res.status(200).json({ message: "Product created successfully", insertId: result.insertId })
                        } else {
                            res.status(500).json({ message: result.message })
                        }
                    } else if (date >= expireTime) {
                        res.clearCookie('auth')
                        res.status(401).json({ nessage: 'Session Closed' })
                    } else {
                        res.clearCookie('auth')
                        res.status(401).json({ error: 'Unauthorized access' })
                    }
                })
            }

        } else {
            res.status(401).json({ error: 'Unauthorized access' })
        }

    } catch (error) {
        if (error.message === "Duplicate entry for Product ID") {
            res.status(409).json({ message: 'Duplicate entry, ensure the ID is unique' })
        } else if (error.message === "Entry with the same name already exists") {
            res.status(422).json({ message: "Product with the name already exists" })
        }
        else {
            console.log("Internal Server Error", error)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
}

module.exports = { createProductController }