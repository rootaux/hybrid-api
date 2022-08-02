const express = require("express")
const router = express.Router()
const UserService = require("./services/authService")
const jwt = require('jsonwebtoken');

router.route("/register").post(async (req, res) => {
    try {
        const { username, password, userType } = req.body;
        const user = await UserService.saveUser({
            username,
            password,
            userType
        })
        return res.json({
            message: "Account successfully created!"
        })
    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message
        })
    }
})

router.route("/login").post(async (req, res) => {
    {
        try {
            const { username, password } = req.body
            const user = await UserService.getUser({
                username, password
            })
            return res.json({
                token: jwt.sign({
                    id: user._id,
                    username: user.username,
                    userType: user.userType
                }, process.env.JWT_SECRET)
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                message: err.message
            })
        }
    }
})

module.exports = router