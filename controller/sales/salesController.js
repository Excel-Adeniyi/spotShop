const CookieHelper = require("../../helpers/cookieHelper");
const { TotalSalesMade, SumofDaySales, StoreSum, StoreSumofDaySales, ListCloseBook, ClosingBook, StoreClosingBook, GetStoredBooks, UpdateClosingBook } = require("../../model/sales/salesModel");
const jwt = require("jsonwebtoken");
const { CheckTokens } = require("../../model/saveToken/saveToken");


async function ClosingBooks(req, res) {
    try {
        const jwtToken = await CookieHelper(req)

        const rowsData = await CheckTokens(jwtToken)
        rowsData.forEach(async (data) => {
            const date = new Date()
            const expireTime = data.createAt
            if (date < expireTime) {
                const results = await ListCloseBook()
                if (results !== undefined) {
                    res.status(200).json({ Success: results })
                } else {
                    res.status(204).json({ message: 'No content' })
                }
            } else if (date >= expireTime) {
                res.clearCookie('auth')
                res.status(401).json({ nessage: 'Session Closed' })
            } else {
                res.clearCookie('auth')
                res.status(401).json({ error: 'Unauthorized access' })
            }
        })

    } catch (error) {
        console.log(error)
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

async function StoreClosingBooks(req, res) {
    try {
        const jwtToken = await CookieHelper(req)

        const rowsData = await CheckTokens(jwtToken)
        rowsData.forEach(async (data) => {
            const date = new Date()
            const expireTime = data.createAt
            const username = data.username
            if (date < expireTime) {
                const dailySales = await ClosingBook();
                // console.log(dailySales.total_quantity)
                if (dailySales.length > 0) {
                    for (const record of dailySales) {
                        let results = []
                        var total_quantity = record.total_quantity
                        var total_sales = record.total_sales
                        const data = {
                            username, total_quantity, total_sales
                        }
                        const checkBooks = await GetStoredBooks(username)
                        // console.log('HHH',checkBooks)
                        if (checkBooks !== null) {
                            const updateBook = UpdateClosingBook(data)
                            // console.log(updateBook)
                            if (updateBook !== null) {
                                results.push({ success: "Record Updated successfully" })
                            } else {
                                results.push({ error: "Error Updating Record" })
                            }
                        } else {
                            const outputTotal = await StoreClosingBook(data)
                            if (outputTotal !== undefined) {
                                results.push({ Success: "Sales Successfully Saved" })
                            } else {
                                results.push({ error: "No Content" })
                            }
                        }
                        if (results.success !== undefined) {
                            res.status(200).json({ results })
                        } else {
                            res.status(500).json({ results })
                        }
                    }
                }

            } else if (date >= expireTime) {
                res.clearCookie('auth')
                res.status(401).json({ nessage: 'Session Closed' })
            } else {
                res.clearCookie('auth')
                res.status(401).json({ error: 'Unauthorized access' })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = { StoreClosingBooks, ClosingBooks }