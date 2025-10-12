const Brand = require('../models/brandModel')


const baseURL = 'http://localhost:7000/download/'
const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll()
        const updateBrands = brands.map((b) => (
            {
                id: b.id,
                bName: b.bName,
                bImage: b.bImage ? `${baseURL}${b.bImage}` : ''
            }
        ))
        console.log(updateBrands)
        res.status(200).send({ brands: updateBrands, success: true })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }
}

async function createBrand(req, res) {
    console.log(req.body)
    bName = req.body.bName;
    bImage = req.file ? req.file.filename : null
    try {
        const newBrand = await Brand.create({ bName: bName, bImage: bImage })
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

async function getBrandById(req, res) {
    const id = req.params.id;
    try {
        const brand = await Brand.findByPk(id);
        const updateBrand = {
            id: brand.id,
            bName: brand.bName,
            bImage: brand.bImage ? `${baseURL}${brand.bImage}` : ''
        }
        if (!brand) {
            res.status(404).send({ message: "Brand not found" });
        } else {

            res.status(200).send({ brands: updateBrand, success: true });
        }

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}


async function updateBrand(req, res) {
    const { id } = req.params;
    const { bName } = req.body;
    const bImage = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return res
                .status(404)
                .send({ msg: "Brand not found", success: false });
        }

        brand.bName = bName || brand.bName;
        if (bImage) brand.bImage = bImage;
        await brand.save();

        res.status(200).send({
            msg: "Brand updated successfully",
            success: true,
            brand: {
                id: brand.id,
                bName: brand.bName,
                bImage: brand.bImage ? `${baseURL}${brand.bImage}` : "",
            },
        });
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