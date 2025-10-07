const express = require('express')
const categoryController = require('../controllers/categoryContraller')
const { uploadSingle } = require('../middleware/multer')

const router = express.Router()

router.get('/getAllCategories', categoryController.getAllCategories)
router.get('/getCategoryById/:ID', categoryController.getCategoryById)
router.post("/createCategory", uploadSingle("myfile"),categoryController.createCategory)
router.delete("/deleteCategory/:id", uploadSingle("myfile"),categoryController.deleteCategory)
router.put("/updateCategory/:id", uploadSingle("myfile"),categoryController.updateCategory)

module.exports = router



