const express = require('express')

const userController = require('../controller/userController')
const getTotalSales = require('../controller/sales/salesController')
// const createSaleController = require('../controller/sales/createSalesController')
const AdminController = require('../controller/employee/adminController')
const RegionalManagerController = require('../controller/employee/rmanagerController')
const { branchController } = require('../controller/branch/branchController')
const { createProductController } = require('../controller/product/productController')
const purchaseC = require('../controller/sales/createSalesController')
const checkValid = require('../middleware/session')
const UpdateProduct = require('../controller/product/updateProductController')


const router = express.Router()

// router.get('/login', userController.token)
router.post('/login', userController.login)
router.post('/signup', userController.createUser)
router.get('/list/closebook', checkValid, getTotalSales.ClosingBooks)
router.post('/sales/purchase', checkValid, purchaseC.purchaseController)
router.get('/sales/listPerday', checkValid, purchaseC.GetCurrentSalesList)
router.get('/employee', AdminController)
router.post('/rmanagercreate', RegionalManagerController)
router.post('/branch', branchController)
router.post('/product', checkValid, createProductController)
router.put('/product/update', checkValid, UpdateProduct)
router.post('/save/closingbook', checkValid, getTotalSales.StoreClosingBooks)

module.exports = { router }
