const Category = require('../models/categoryModel')


const baseURL = 'http://localhost:7000/download/'
 const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll() 
        const updateCategories = categories.map((c)=>(
            {
                id : c.id,
                cName : c.cName,
                cImage : c.cImage ? `${baseURL}${c.cImage}` : ''
            }
        ))
        res.status(200).send({categories:updateCategories,  success:true })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

async function getCategoryById(req, res) {
    const ID = req.params.ID
    try {
            const category = await Category.findByPk(ID);
            const updateCategory = {
                id: category.id,
                cName: category.cName,
                cImage: category.cImage ? `${baseURL}${category.cImage}` : ''
            }
            if (!category) {
                res.status(404).send({ message: "Category not found" });
            } else {
    
             res.status(200).send({ category : updateCategory, success: true });        }
    
        } catch (error) {
            res.status(500).send({ msg: 'server error' })
        }
    
    }


async function createCategory(req, res) {
    console.log(req.body)
    const cName = req.body.cName;
    const cImage = req.file ? req.file.filename : null;
    try {
        const newCategory = await Category.create({cName: cName, cImage: cImage })
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
  const { cName } = req.body; 
  
  try {
    const updateCat = await Category.findByPk(id);

    if (!updateCat) {
      return res
        .status(404)
        .send({ msg: "Category not found", success: false });
    }

    const cImage = req.file ? req.file.filename : updateCat.cImage;

    await updateCat.update({ cName, cImage });
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