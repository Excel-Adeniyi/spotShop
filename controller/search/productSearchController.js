const ProductSearchModel = require("../../model/search/productSearchModel")


async function ProductSearch(req, res) {
    const {product} = req.body

    try {
        const data= `%${product}%`
        const result = await ProductSearchModel(data)
        if (result !== null){
            res.status(200).json({success: result})
        } else{
            res.status(500).json({error: "Product not found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

module.exports = ProductSearch