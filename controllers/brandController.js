const Brand = require('../models/brandModel')

const getAllBrands = async (req, res) => {
     try {
        const brands = await Brand.findAll() 
        res.status(200).send({brands:brands, success:true })
        
    } catch (error) {
         res.status(500).send({ msg: 'server error' })
    }
}

function getBrandById(req, res) {
    const ID = req.params.ID;
  try {
        
    } catch (error) {
         res.status(500).send({ msg: 'server error' })
    }

}

async function createBrand(req, res) {
    console.log(req.body)
    try {
        const newBrand = await Brand.create(req.body)
        if (newBrand) {
            res.status(200).send({ msg: 'Brand created Successfully', success: true })
        } else {
            res.status(500).send({ msg: "Error with creating brand", success: false })
        }
        
    } catch (error) {
         console.error("Create Brand Error:", error);
    res.status(500).send({ msg: 'server error', error: error.message });
    }
  
}

async function updateBrand(req, res) {
  const { id } = req.params;
  const { bName } = req.body; // ✅ extract cName directly

  try {
    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res
        .status(404)
        .send({ msg: "Brand not found", success: false });
    }

    brand.bName = bName; 
    await brand.save();

    res
      .status(200)
      .send({ msg: "Brand updated successfully", success: true, brand: brand });

  } catch (error) {
    console.error("Update brand Error:", error);
    res.status(500).send({ msg: "Server error", success: false });
  }
}


async function deleteBrand(req, res) {
    const id = req.params.id;
    try {
        const deleted = await Brand.destroy({ where: { id: id } }); 
        if (deleted) {
            res.status(200).send({ msg: 'Brand deleted Successfully', success: true });
        } else {
            res.status(404).send({ msg: "Brand not found", success: false });
        }
    } catch (error) {
        console.error("Delete Brand Error:", error);
        res.status(500).send({ msg: 'Server error', error: error.message });
    }
}



module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    deleteBrand,
    updateBrand
}