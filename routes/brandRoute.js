const express = require('express');
const brandController = require('../controllers/brandController');
const { uploadSingle } = require('../middleware/multer');
const {protect, adminOnly } = require('../middleware/auth');


const router = express.Router()

router.get('/getAllBrands', brandController.getAllBrands)
router.get('/getBrandsById/:ID', brandController.getBrandById)
router.post('/createBrand',protect, adminOnly, uploadSingle("myfile"), brandController.createBrand)
router.delete('/deleteBrands/:id',protect, adminOnly, uploadSingle("myfile"),protect,brandController.deleteBrand)
router.put('/updateBrand/:id',protect, adminOnly, brandController.updateBrand)

module.exports = router



