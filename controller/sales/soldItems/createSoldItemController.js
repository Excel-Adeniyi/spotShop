const CookieHelper = require('../../../helpers/cookieHelper')
const { createSalesModel } = require('../../../model/sales/createSalesModel')
const jwt = require("jsonwebtoken");
const { CheckTokens } = require("../../../model/saveToken/saveToken");
const { GetAllProduct, UpdateQuantity } = require('../../../model/product/productModel');
const GetSalesByDate = require('../../../model/sales/SalesByDate');
const UUID = require('../../../helpers/uuid');

async function purchaseController(req, res) {
    const salesData = req.body
    try {
        const jwtToken = await CookieHelper(req)
        if (jwtToken !== undefined) {
            const checkTokenValidation = jwt.verify(jwtToken, process.env.JWT_SECRET)
            if (!checkTokenValidation) {
                res.status(401).json({ error: 'Unauthorized access' })
            } else {

                const rowsData = await CheckTokens(jwtToken)
                rowsData.forEach(async (data) => {
                    const date = new Date()
                    const expireTime = data.createAt
                    if (date < expireTime) {
                        let results = []
                        const username = checkTokenValidation.username
                        for (const sales of salesData) {
                            const data = {
                                ...sales,
                                username
                            }
                            const product_name = data.product
                            const getProducts = await GetAllProduct(product_name)
                            if (getProducts !== null) {
                                for (const products of getProducts) {
                                    if (products.product_quantity_left > 0) {
                                        const products = await createSalesModel(data)
                                        if (products !== null) {
                                            results.push("Successfully purchased")
                                        } else {
                                            results.push("Purchase unsuccessful")
                                        }

                                        const currentQuantity = Math.abs(products.product_quantity_left - data.quantity)
                                        if (currentQuantity > 0) {
                                            const prodName = data.product
                                            await UpdateQuantity(currentQuantity, prodName)
                                        } else {
                                            const prodName = data.product
                                            const currentQuantity = 0
                                            //Update Product quantity to zero
                                            await UpdateQuantity(currentQuantity, prodName)
                                        }
                                    } else {
                                        results.push(`${product_name}: Stock is less than required`)
                                    }
                                }
                            } else {
                                results.push(`${product_name}: Stock not found`)
                            }
                        }
                        res.status(201).json({ message: results });
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
        if (error.message === "Duplicate entry for sales ID") {
            res.status(409).json({ message: 'Duplicate entry, ensure the ID is unique' })
        } else if (error.message === "Entry with the same name already exists") {
            res.status(422).json({ message: "sales with the name already exists" })
        }
        else {
            console.log("Internal Server Error", error)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
}


async function GetCurrentSalesList(req, res) {
    const { date1, date2 } = req.body
    // console.log('DDDD', {date1, date2})
    const jwtToken = await CookieHelper(req)
    const checkTokenValidation = jwt.verify(jwtToken, process.env.JWT_SECRET)
    const username = checkTokenValidation.username
    console.log(username)
    try {
        const data = [
            username, date1, date2
        ]
        const results = await GetSalesByDate(data)
        if (results !== null) {
            res.status(200).json({ results })
        } else {
            res.status(404).json({ message: 'record not found' })
        }
    } catch (error) {
        console.log('ERROR CURRENTSALESLIST', error)
        res.status(500).json({ error: "Internal Server error" })
    }
}

module.exports = { purchaseController, GetCurrentSalesList }