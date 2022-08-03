const mongoose = require("mongoose")
const User = require("../../models/users")
const Catalogue = require("../../models/catalogue")

const getSellers = async () => {
    const listOfSellers = await User.find({
        userType: "seller"
    }).select("username _id")
    return listOfSellers
}

const getProducts = async (sellerId) => {
    const listOfProducts = await Catalogue.find({
        sellerId: sellerId
    }).select("products -_id")
    return listOfProducts
}


module.exports.getSellers = getSellers
module.exports.getProducts = getProducts