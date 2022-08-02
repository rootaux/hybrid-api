const mongoose = require("mongoose")
const User = require("../../models/users")

const getSellers = async () => {
    const listOfSellers = await User.find({
        userType: "seller"
    }).select("username _id")
    return listOfSellers
}


module.exports.getSellers = getSellers