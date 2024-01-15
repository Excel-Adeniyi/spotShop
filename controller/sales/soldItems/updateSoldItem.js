const { GetAllProduct, UpdateQuantity } = require("../../../model/product/productModel")
const UpdateSoldItemsModel = require("../../../model/sales/updateSoldItemModel")


async function UpdateSoldItem(req, res) {
    const { product, quantity, price, totalAmount, uuid } = req.body
    const timeday = new Date()
    timeday.setHours(timeday.getHours() + 1)
    const updated = 1
    const data = [
        product, quantity, price, totalAmount, timeday, updated, uuid
    ]
    // console.log(data)
    try {
        let results = []
        const getProducts = await GetAllProduct(product)
        if (getProducts !== null) {
            for (const products of getProducts) {
                if (products.product_quantity_left > 0 && products.product_quantity_left >= quantity) {
                    const response = await UpdateSoldItemsModel(data)
                    console.log(response)
                    if (response !== null) {
                        results.push("Item Update Successful")
                    } else {
                        results.push("Item update unsuccessful")
                    }

                    const currentQuantity = Math.abs(products.product_quantity_left - quantity)
                    if (products.product_quantity_left < quantity) {
                        results.push("Quantity more than Item")
                    } else if (currentQuantity > 0) {
                        const prodName = product
                        console.log(prodName)
                        const response = await UpdateQuantity(currentQuantity, product)
                        if (response !== undefined) {
                            console.log(response)
                        }
                    } else {
                        const prodName = product
                        const currentQuantity = 0
                        //Update Product quantity to zero
                        await UpdateQuantity(currentQuantity, prodName)
                    }
                } else {
                    results.push(`${product}: Stock is less than required`)
                }
            }
        } else {
            results.push(`${product}: Stock not found`)
        }
        res.status(201).json({ message: results });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })
    }
}

module.exports = UpdateSoldItem