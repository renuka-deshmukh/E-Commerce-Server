const express = require('express')
const brandController = require('../controllers/brandController')

const router = express.Router()

router.get('/getAllBrands', brandController.getAllBrands)
router.get('/getBrandsById/:ID', brandController.getBrandById)
router.post('/createBrand',brandController.createBrand)
router.delete('/deleteBrands/:id',brandController.deleteBrand)
router.put('/updateBrand/:id',brandController.updateBrand)

module.exports = router



