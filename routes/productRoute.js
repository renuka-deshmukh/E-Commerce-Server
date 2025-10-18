const express = require('express')
const { protect, adminOnly } = require('../middleware/auth')
const productController = require('../controllers/productController')
const { uploadSingle } = require('../middleware/multer')

const router = express.Router()

router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProductById/:id', productController.getProductById)

router.post('/createProduct', protect, adminOnly, uploadSingle("myfile"), productController.createProduct)
router.delete('/deleteProduct/:id', protect, adminOnly, productController.deleteProduct)
router.put("/updateProduct/:id", protect, adminOnly, productController.updateProduct)

router.get('/getProductByBrand/brand/:brandID', productController.getProductByBrand)
router.get("/getProductByCategory/category/:category", productController.getProductsByCategory);



// router.get("/category/:catID", productController.getProductsByCategory);
router.get('/filter', productController.getProductByFilter)

module.exports = router