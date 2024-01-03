const { CreateProductModel } = require("../../model/product/productModel")




async function createProductController(req, res) {
    const productData = req.body

    try {
        const result = await CreateProductModel(productData)
        if (result.success) {
            res.status(200).json({ message: "Product created successfully", insertId: result.insertId })
        } else {
            res.status(500).json({ message: result.message })
        }
    } catch (error) {
        if (error.message === "Duplicate entry for Product ID") {
            res.status(409).json({ message: 'Duplicate entry, ensure the ID is unique' })
        } else if (error.message === "Entry with the same name already exists") {
            res.status(422).json({ message: "Product with the name already exists" })
        }
        else {
            console.log("Internal Server Error", error)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
}

module.exports = { createProductController }