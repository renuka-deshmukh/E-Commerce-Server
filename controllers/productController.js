const { Op } = require('sequelize')
const Product = require('../models/productModel')
const Brand = require('../models/brandModel')

const getAllProducts = async (req, res) => {

    try {
        const prods = await Product.findAll()
        res.status(200).send({ products: prods, success: true })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ success: false, msg: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ msg: "Server error" });
    }
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

async function updateProduct(req, res) {
    const id = req.params.id
    const { pName, pDescription, price, quentity, catID, brandID } = req.body;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            res.status(404).send({ msg: "product not found", success: false })
        }

        if (pName !== undefined) product.pName = pName;
        if (pDescription !== undefined) product.pDescription = pDescription;
        if (price !== undefined) product.price = price;
        if (quentity !== undefined) product.quentity = quentity;
        if (catID !== undefined) product.catID = catID;
        if (brandID !== undefined) product.brandID = brandID;

        await product.save();
        res.status(200).send({ msg: "Product updated successfully", success: true })

    } catch {
        console.error("Update Product Error:", error);
        res.status(500).send({ msg: "Server error", error: error.message });

    }
};

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

async function getProductByFilter(req, res) {
    console.log(req.query);
    const { minPrice, maxPrice } = req.query

    const whereClause = {}

    if (minPrice && maxPrice) {
        whereClause.price = { [Op.between]: [Number(minPrice), Number(maxPrice)] };
    }
    try {
        const products = await Product.findAll({
            where: whereClause,
            include: ["Category", "Brand"]
        });
        console.log(products)

        if (!products) {
            res.status(201).send({ success: true, msg: "Product not Found" });
        } else {
            res.status(200).send({ success: true, products: products });
        }

    } catch (error) {

        res.status(500).send({ msg: "Server error" });
    }
}

async function getProductByBrand(req, res) {
    try {
        const { brandID } = req.params;
        const products = await Product.findAll({
            where: { brandID },
            include: [
                {
                    model: Brand,
                    attributes: ["id", "bName"],
                },
            ],
        });
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products by brand:", error);
        res.status(500).json({ msg: "Server error" });
    }
}




module.exports = {
    getProductByBrand,
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductByFilter
}