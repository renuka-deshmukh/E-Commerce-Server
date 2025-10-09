const express = require('express')
const categoryController = require('../controllers/categoryContraller')
const { uploadSingle } = require('../middleware/multer')
const {protect, adminOnly } = require('../middleware/auth')

const router = express.Router()

router.get('/getAllCategories', categoryController.getAllCategories)
router.get('/getCategoryById/:ID', categoryController.getCategoryById)
router.post("/createCategory",protect, adminOnly, uploadSingle("myfile"), categoryController.createCategory)
router.delete("/deleteCategory/:id",protect, adminOnly, uploadSingle("myfile"), categoryController.deleteCategory)
router.put("/updateCategory/:id",protect, adminOnly, uploadSingle("myfile"), categoryController.updateCategory)

module.exports = router



