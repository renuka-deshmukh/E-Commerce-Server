const Product = require('../models/productModel')

const getAllProducts = async (req, res) => {

    try {
        const prods = await Product.findAll()
        res.status(200).send({ products: prods, success: true })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }
}

const getProductById = (req, res) => {



}

async function createProduct(req, res) {

    console.log(req.body)
    try {
        const newProduct = await Product.create(req.body)
        if (newProduct) {
            res.status(200).send({ msg: 'Product created Successfully', success: true })
        } else {
            res.status(500).send({ msg: "Error with creating Product", success: false })
        }

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

function updateProduct(req, res) {


}

async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.status(200).send({ msg: "Product deleted Successfully", success: true });
        } else {
            res.status(404).send({ msg: "Product not found", success: false });
        }
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).send({ msg: "Server error", error: error.message });
    }
}



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}