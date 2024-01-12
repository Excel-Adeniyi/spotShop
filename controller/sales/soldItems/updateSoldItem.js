const UpdateSoldItemsModel = require("../../../model/sales/updateSoldItemModel")


async function UpdateSoldItem(req, res) {
    const { product, quantity, price, totalAmount, uuid } = req.body
    const timeday = new Date()
    timeday.setHours(timeday.getHours() + 1)
    const updated = 1
    const data = [
        product, quantity, price, totalAmount, timeday, updated, uuid
    ]
    console.log(data)
    try {
        const response = await UpdateSoldItemsModel(data)
        if ( response !== undefined){
            res.status(200).json({success: 'Sold Item Updated Successfully'})
        } else {
            res.status(500).json({message: "Item not updated"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "internal server error"})
    }
}

module.exports = UpdateSoldItem