const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/users");
const { generateAccessToken } = require("../controllers/login");

const router = express.Router();

router.route("/").post(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.isDeleted) {
            return res.status(404).send({
                status: 404,
                message: "Invalid Email. User not found",
            });
        } 
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) {
            return res.status(404).send({
                status: 404 ,
                message: "Invalid Password",
            });
        }
        return res.status(200).send({
            status: 200,
            message: "Logged in successfully",
            data: {
                id:user._id,
                name: user.name,
                role: user.role,
                token: generateAccessToken(user),
                tokenExpiresAt: Date.now() + 3600000
            }
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
        });
    }
});

module.exports = router;