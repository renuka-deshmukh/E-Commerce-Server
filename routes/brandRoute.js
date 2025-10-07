const express = require('express')
const brandController = require('../controllers/brandController')
const { uploadSingle } = require('../middleware/multer')


const router = express.Router()

router.get('/getAllBrands', brandController.getAllBrands)
router.get('/getBrandsById/:ID', brandController.getBrandById)
router.post('/createBrand', uploadSingle("myfile"), brandController.createBrand)
router.delete('/deleteBrands/:id', uploadSingle("myfile"),brandController.deleteBrand)
router.put('/updateBrand/:id',brandController.updateBrand)

module.exports = router



