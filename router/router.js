const express = require('express')

const userController = require('../controller/userController')
const getTotalSales = require('../controller/sales/salesController')
// const createSaleController = require('../controller/sales/createSalesController')
const AdminController = require('../controller/employee/adminController')
const RegionalManagerController = require('../controller/employee/rmanagerController')
const { branchController } = require('../controller/branch/branchController')
const { createProductController } = require('../controller/product/productController')
const purchaseC = require('../controller/sales/soldItems/createSoldItemController')
const checkValid = require('../middleware/session')
const UpdateProduct = require('../controller/product/updateProductController')
const DeleteProduct = require('../controller/product/deleteProductController')
const UpdateSoldItem = require('../controller/sales/soldItems/updateSoldItem')


const router = express.Router()

// router.get('/login', userController.token)
router.post('/login', userController.login)
router.post('/signup', userController.createUser)

//sales
router.get('/list/closebook', checkValid, getTotalSales.ClosingBooks)
router.post('/sales/purchase', checkValid, purchaseC.purchaseController)
router.get('/sales/listPerday', checkValid, purchaseC.GetCurrentSalesList)
router.put('/sales/updateSales', checkValid, UpdateSoldItem)
router.post('/save/closingbook', checkValid, getTotalSales.StoreClosingBooks)

//USers
router.get('/employee', AdminController)
router.post('/rmanagercreate', RegionalManagerController)
router.post('/branch', branchController)

//product
router.post('/product', checkValid, createProductController)
router.put('/product/update', checkValid, UpdateProduct)
router.delete('/product/delete', checkValid, DeleteProduct)


module.exports = { router }
