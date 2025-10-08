const User = require("../models/userModel");

async function register(req, res) {

    try {
        const { name, email, mobileNumber, role, password } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).send({ msg: "User already exist", success: false });

        const user = await User.create({ name, email, mobileNumber, role, password });
        res.status(200).send({
            id: user.id, name: user.name,
            mobileNumber: user.mobileNumber, role: user.role, password: user.password
        });
        res.status(200).send({ msg: " Registered Successfully..." })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(400).send({ msg: "User not found " })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ msg: "Invalid Credentials" })

        res.status(200).json({
            msg: "Login Successfull", user: {
                id: user.id, name: user.name,
                mobileNumber: user.mobileNumber, role: user.role, password: user.password
            }, success: true
        })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

async function getUserInfo(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.status(200).send({ success: true, user })

    } catch (error) {
        res.status(500).send({ msg: 'server error' })
    }

}

module.exports = {
    register,
    login,
    getUserInfo
}