const DeleteProductModel = require("../../model/product/deleteProductModel")

async function DeleteProduct(req, res) {
    const { product_id } = req.body

    try {
        const response = await DeleteProductModel(product_id)
        if (response !== undefined) {
            res.status(200).json({ success: "Product deleted successfully" })
        } else {
            res.status(500).json({ message: "Unable to deleted product" })
        }
    } catch (error) {
        console.log("ERROR FROM DELETE PRODUCT", error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = DeleteProduct