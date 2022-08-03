const mongoose = require("mongoose")
const User = require("../../models/users")
const Catalogue = require("../../models/catalogue")
const Order = require("../../models/orders")

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

const makeOrder = async ({itemsToBuy, sellerId, buyerId}) => {
    var catalogueProducts = await Catalogue.find({
        sellerId: sellerId
    }).select("products -_id")
    if(catalogueProducts.length == 0){
        throw new Error("Seller does not have any products!")
    }
    catalogueProducts =  catalogueProducts[0].products
    var totalPrice = 0;
    var buyItems = []
    var intr = itemsToBuy.filter(({ name : idx1 }) => catalogueProducts.some(({name: idx2, price: price, _id: itemId}) => {
        if(idx1 === idx2){
            totalPrice += price
            itemId = itemId.toString()
            buyItems.push({productId: itemId, name: idx2, price})
        }
    }))
    console.log(buyItems)
    const order = await new Order({
        buyerId,
        sellerId,
        products: buyItems,
        orderTotal: totalPrice
    }).save()
    return order

}

module.exports.getSellers = getSellers
module.exports.getProducts = getProducts
module.exports.makeOrder = makeOrder