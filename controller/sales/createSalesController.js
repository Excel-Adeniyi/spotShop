const { createSalesModel } = require('../../model/sales/createSalesModel')


async function createSaleController(req, res) {
    const { product, quantity, price, totalAmount } = req.body
    const timestamp = new Date()
    console.log(timestamp)
    try {
        const products = await createSalesModel(product, quantity, price, totalAmount, timestamp)
        console.log('created a new sale', products)

        res.status(201).json({ message: 'Sales record created successfully' });

    } catch (error) {
        console.error('Error creating sales record:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = createSaleController