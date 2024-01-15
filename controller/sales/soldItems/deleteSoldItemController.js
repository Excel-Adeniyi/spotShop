const DeleteSoldItemModel = require("../../../model/sales/deleteSalesModel")
const GetOneSoldItemModel = require("../../../model/sales/getOneSoldItemModel")
const saveDeletedItemsModel = require("../../../model/sales/saveDeletedItemsModel")
// const GetSoldItem = require("./getItembyUUIDController")

async function DeleteSoldItem(req, res) {
    const { product_uuid } = req.body
    try {
        const [fetchitem] = await GetOneSoldItemModel(product_uuid)
        const product = fetchitem.product
        const quantity = fetchitem.quantity
        const price = fetchitem.price
        const totalAmount = fetchitem.totalAmount
        const username = fetchitem.username
        if (fetchitem !== undefined) {
            const data = {
            product, quantity, price, totalAmount, username
            }
            const storedeleteItem = await saveDeletedItemsModel(product, quantity, price, totalAmount, username)
            if (storedeleteItem !== undefined) {
                const deleted = await DeleteSoldItemModel(product_uuid)
                if (deleted !== undefined) {
                    res.status(200).json({ success: "Item removed" })
                } else {
                    res.status(500).json({ error: "unable delete item" })
                }
            } else {
                res.status(500).json({ error: "Store: unable delete item" })
            }
        } else {
            res.status(500).json({ error: "fetch: unable delete item" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = DeleteSoldItem