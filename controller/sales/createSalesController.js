const CookieHelper = require('../../helpers/cookieHelper')
const { createSalesModel } = require('../../model/sales/createSalesModel')
const jwt = require("jsonwebtoken");
const { CheckTokens } = require("../../model/saveToken/saveToken");
const { GetAllProduct, UpdateQuantity } = require('../../model/product/productModel');
const GetSalesByDate = require('../../model/sales/SalesByDate');

async function purchaseController(req, res) {
    const salesData = req.body
    console.log('DATA', salesData)
    try {
        const jwtToken = await CookieHelper(req)
        if (jwtToken !== undefined) {
            const checkTokenValidation = jwt.verify(jwtToken, process.env.JWT_SECRET)
            console.log('CHECKTOKEN', checkTokenValidation)
            if (!checkTokenValidation) {
                res.status(401).json({ error: 'Unauthorized access' })
            } else {
                const rowsData = await CheckTokens(jwtToken)
                rowsData.forEach(async (data) => {
                    const date = new Date()
                    const options = { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' }
                    const formatTime = date.toLocaleDateString('en-US', options)
                    console.log("OJO", formatTime)
                    const expireTime = data.createAt
                    if (date < expireTime) {
                        const now = new Date()
                        const timestamp = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Lagos' }).format(now)
                        console.log('TT', now)
                        let results = []
                        const username = checkTokenValidation.username
                        for (const sales of salesData) {
                            const data = {
                                ...sales,
                                username
                            }
                            console.log('DATAS', data)
                            const products = await createSalesModel(data)
                            results.push(products)
                            if (products !== undefined) {
                                const product_name = data.product
                                const getProducts = await GetAllProduct(product_name)
                                console.log('PRODUCTS', getProducts)
                                if (getProducts !== null) {
                                    for (const products of getProducts) {
                                        if (products.product_quantity_left > 0) {
                                            const currentQuantity = Math.abs(products.product_quantity_left - data.quantity)
                                            console.log('PRODUCT_QUAN', currentQuantity)
                                            if (currentQuantity > 0) {
                                                const prodName = data.product
                                                console.log('INSIDE')
                                                const result = await UpdateQuantity(currentQuantity, prodName)
                                                console.log('UPDATE', result)
                                                // res.json({Success: 'Sales'})
                                            } else if (currentQuantity === 0) {
                                                console.log('ZERO')
                                                const prodName = data.product
                                                const currentQuantity = 0
                                                console.log('INSIDE')
                                                const result = await UpdateQuantity(currentQuantity, prodName)
                                                console.log('UPDATE', result)
                                            }

                                            else {
                                                console.log('Nothing')

                                            }

                                        } else {
                                            console.log('SERVICE')

                                        }
                                    }
                                }
                                // getProducts
                            }
                        }

                        res.status(201).json({ message: 'Sales record created successfully' });
                        return

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
    console.log('DDDD', {date1, date2})
    const jwtToken = await CookieHelper(req)
    const checkTokenValidation = jwt.verify(jwtToken, process.env.JWT_SECRET)
    const username = checkTokenValidation.username
    try {
        const data = [
            username, date1, date2
        ]
        const results  = await GetSalesByDate(data)
        if (results !== undefined){
            res.status(200).json({results})
        }else {
            res.status(404).json({message: 'record not found'})
        }
    } catch (error) {
        console.log('ERROR CURRENTSALESLIST', error)
        res.status(500).json({error: "Internal Server error"})
    }
}

module.exports = {purchaseController, GetCurrentSalesList}