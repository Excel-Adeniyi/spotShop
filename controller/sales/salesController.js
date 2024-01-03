const { TotalSalesMade } = require("../../model/sales/salesModel");



async function getTotalSales(req, res) {
    try {
        const dailySales = await TotalSalesMade();
        console.log(dailySales)
        res.status(200).json({ dailySales })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports = getTotalSales