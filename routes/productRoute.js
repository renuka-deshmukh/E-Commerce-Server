const express = require('express')

const productController = require('../controllers/productController')

const router = express.Router()

router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProductById/:ID', productController.getProductById)
router.post('/createProduct', productController.createProduct)
router.delete('/deleteProduct/:ID',productController.deleteProduct)
router.put("/updateProduct/:ID",productController.updateProduct)

module.exports = router