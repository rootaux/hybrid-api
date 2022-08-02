const mongoose = require("mongoose")
const User = require("../../models/users")

const saveUser = async ({ username, password, userType }) => {
    try {
        const user = await new User({
            username,
            password,
            userType
        }).save()
    } catch (err) {
        throw new Error("Username already exists!")
    }
    return user
}

const getUser = async ({ username, password }) => {
    const user = await User.findOne({
        username: username
    })
    if (user.password != password) {
        throw new Error("Invalid password")
    }
    return user
}

module.exports.saveUser = saveUser
module.exports.getUser = getUser