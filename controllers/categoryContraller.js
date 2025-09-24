const Category = require('../models/categoryModel')

 const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll() 
        res.status(200).send({categories:categories, success:true })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

function getCategoryById(req, res) {
    const ID = req.params.ID
    try {
 console.log(ID)
    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }


}

async function createCategory(req, res) {
    console.log(req.body)
    try {
        const newCategory = await Category.create(req.body)
        if (newCategory) {
            res.status(200).send({ msg: 'category created Successfully', success: true })
        } else {
            res.status(500).send({ msg: "Error with creating Category", success: false })
        }

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

function updateCategory(req, res) {

    try {

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

function deleteCategory(req, res) {

    try {

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}




module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
}