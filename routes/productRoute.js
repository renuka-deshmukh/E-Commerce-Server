const express = require('express')

const productController = require('../controllers/productController')

const router = express.Router()

router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProductById/:ID', productController.getProductById)
router.post('/createProduct', productController.createProduct)
router.delete('/deleteProduct/:id',productController.deleteProduct)
router.put("/updateProduct/:id",productController.updateProduct)

module.exports = router