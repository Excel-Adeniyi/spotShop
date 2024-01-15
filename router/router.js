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
const GetSoldItem = require('../controller/sales/soldItems/getItembyUUIDController')
const DeleteSoldItem = require('../controller/sales/soldItems/deleteSoldItemController')
const SalesSearch = require('../controller/search/salesSearchController')
const ProductSearch = require('../controller/search/productSearchController')


const router = express.Router()

// router.get('/login', userController.token)

//Auth
router.post('/login', userController.login)
router.post('/createUser', userController.createUser)

//sales
router.get('/sales/listPerday', checkValid, purchaseC.GetCurrentSalesList) //Get sold items via date {date1, date2}
router.get('/sales/getoneitem', checkValid, GetSoldItem) //Get sold items via product_uuid ... this gets one
router.post('/sales/purchase', checkValid, purchaseC.purchaseController) //create sold items
router.put('/sales/updatesales', checkValid, UpdateSoldItem) //update sold items
router.delete('/sales/delete', checkValid, DeleteSoldItem) //delete sold items

//Closing books
router.post('/save/closingbook', checkValid, getTotalSales.StoreClosingBooks) // for closing account ... this sums all the sales for a day in the end_of_day_sales table
router.get('/list/closebook', checkValid, getTotalSales.ClosingBooks) // get all list closing account


//USers
router.get('/employee', AdminController)
router.post('/rmanagercreate', RegionalManagerController)
router.post('/branch', branchController)

//product
router.post('/product', checkValid, createProductController) // product creation to be served in the Create sales form
router.put('/product/update', checkValid, UpdateProduct) // update product created
router.delete('/product/delete', checkValid, DeleteProduct) // delete a product


//Search
router.get('/search/sales', checkValid, SalesSearch.SalesSearch) //search for staff only product and totalAmount
router.get('/search/sales/admin', checkValid, SalesSearch.AdminSalesSearch) //search for the admin end where admin can sort by product, totalAmount and name 
router.get('/search/product', checkValid, ProductSearch) //search for the product done by admin
module.exports = { router }
