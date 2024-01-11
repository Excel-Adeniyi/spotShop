const UpdateProductModel = require("../../model/product/updateProductModel")


async function UpdateProduct(req, res) {
    const { product_id, product_name, product_price, product_quantity, product_quantity_left } = req.body
    // console.log('PP', product)
    try {
        const data = [
            product_name, product_quantity, product_price, product_quantity_left, product_id,
        ]
        console.log('DD', data)
        const result = await UpdateProductModel(data)
        if (result !== null) {
            console.log('RESULT', result)
            res.status(201).json({ success: 'Product Update Successful' })
        } else {
            res.status(500).json({ error: 'Error Updating Product' })
        }
    } catch (error) {
        console.log("Error at Update Product", error)
        res.status(500).json({ error: error.response })
    }
}

module.exports = UpdateProduct