const express = require('express')
const categoryController = require('../controllers/categoryContraller')

const router = express.Router()

router.get('/getAllCategories', categoryController.getAllCategories)
router.get('/getCategoryById/:ID', categoryController.getCategoryById)
router.post("/createCategory",categoryController.createCategory)
router.delete("/deleteCategory/:id",categoryController.deleteCategory)
router.put("/updateCategory/:id",categoryController.updateCategory)

module.exports = router



