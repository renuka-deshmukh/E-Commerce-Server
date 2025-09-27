const Category = require('../models/categoryModel')

 const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll() 
        res.status(200).send({categories:categories,  success:true })

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
    console.error("Create Category Error:", error);
    res.status(500).send({ msg: 'server error', error: error.message });
}


}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { cName } = req.body; // ✅ extract cName directly

  try {
    const updateCat = await Category.findByPk(id);

    if (!updateCat) {
      return res
        .status(404)
        .send({ msg: "Category not found", success: false });
    }

    updateCat.cName = cName; 
    await updateCat.save();

    res
      .status(200)
      .send({ msg: "Category updated successfully", success: true, category: updateCat });

  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).send({ msg: "Server error", success: false });
  }
}

async function deleteCategory(req, res) {

   const id = req.params.id
try {
        const deleteCategory = await Category.destroy({where: { id}})
        if (deleteCategory) {
            res.status(200).send({ msg: 'Category deleted Successfully', success: true })
        } else {
            res.status(500).send({ msg: "Error with deleting Category", success: false })
        }
        
    } catch (error) {
         console.error("Delete Category Error:", error);
    res.status(500).send({ msg: 'server error', error: error.message });
    }

}




module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
}