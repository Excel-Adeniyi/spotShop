const GetDeletedItems = require("../../model/deletedItems/deletedItemsModel")


async function GetDeletedItemsController(req, res){
    const {date1, date2} = req.body
    try {
        const now = new Date()
        now.setHours(now.getHours() + 1)
        const date = date2 !== undefined ? date2 : now
        const fetchedItem = await GetDeletedItems(date1, date)
        if ( fetchedItem !== undefined){
            res.status(200).json({success: fetchedItem})
        } else {
            res.status(204).json({message: "Unable to find item"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "internal server error"})
    }
}

module.exports = GetDeletedItemsController