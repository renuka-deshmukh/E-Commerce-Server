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
         res.status(500).send({ msg: 'server error' })
    }
  
}

function updateBrand(req, res) {
   const ID = req.params.ID
   try {
        
    } catch (error) {
         res.status(500).send({ msg: 'server error' })
    }
}

function deleteBrand(req, res) {
    const ID = parseInt(req.params.ID)
try {
        
    } catch (error) {
         res.status(500).send({ msg: 'server error' })
    }
    
}




module.exports = {
    getAllBrands,
    getBrandById,
    createBrand,
    deleteBrand,
    updateBrand
}