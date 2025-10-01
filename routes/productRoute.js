const express = require('express')

const productController = require('../controllers/productController')

const router = express.Router()

router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProductById/:id', productController.getProductById)
router.post('/createProduct', productController.createProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)
router.put("/updateProduct/:id",productController.updateProduct)

router.get('/getProductByBrand/brand/:brandID', productController.getProductByBrand)

router.get('/filter', productController.getProductByFilter)

module.exports = router