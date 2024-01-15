const GetOneSoldItemModel = require("../../../model/sales/getOneSoldItemModel")

async function GetSoldItem(req, res){
const {product_uuid} = req.body
try {
const response = await GetOneSoldItemModel(product_uuid)
if (response !== undefined){
    res.status(200).json({success: response})
} else {
    res.status(404).json({message: "Product not found"})
}
} catch (error) {
    res.status(500).json({error: 'Internal server Error'})
}
}

module.exports = GetSoldItem