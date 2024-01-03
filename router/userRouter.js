const express = require('express')

const userController = require('../controller/userController')
const getTotalSales = require('../controller/sales/salesController')
const createSaleController = require('../controller/sales/createSalesController')
const AdminController = require('../controller/employee/adminController')
const RegionalManagerController = require('../controller/employee/rmanagerController')
const { branchController } = require('../controller/branch/branchController')
const { createProductController } = require('../controller/product/productController')


const router = express.Router()

router.get('/login', userController.token)
router.post('/login', userController.login)
router.get('/getSales', getTotalSales)
router.post('/createSales', createSaleController)
router.get('/employee', AdminController)
router.post('/rmanagercreate', RegionalManagerController)
router.post('/branch', branchController)
router.post('/product', createProductController)

module.exports = { router }
