const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

async function addToCart(req, res) {
    try {
        const user_id = req.user.id;
        const { product_id, quantity } = req.body;

        let findItem = await Cart.findOne({
            where: { user_id, product_id }
        });

        if (findItem) {
            findItem.quantity += quantity;
            await findItem.save();
            return res.json({ message: "Item quantity updated", item: findItem });
        }

        const newItem = await Cart.create({
            user_id,
            product_id,
            quantity,
        });

        res.json({ message: "Item added to cart", item: newItem });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getCart(req, res) {
    try {
        const user_id = req.user.id;

        const cartItems = await Cart.findAll({
            where: { user_id },
            include: [
                {
                    model: Product,
                    attributes: ["id", "pName", "price", "pImage"]
                }
            ]
        });

        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function removeItem(req, res) {
    try {
        const { id } = req.params;

        await Cart.destroy({
            where: { id }
        });

        res.json({ message: "Item removed successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function clearCart(req, res) {
    try {
        const user_id = req.user.id; 

        await Cart.destroy({ where: { user_id } });

        res.json({ message: "Cart cleared" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    removeItem,
    addToCart,
    getCart,
    clearCart
}
