const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    buyerId : {
        type : mongoose.Schema.ObjectId, ref: 'users'
    },
    sellerId : {
        type: mongoose.Schema.ObjectId, ref: 'users'
    },
    products: [
        {
            id,
            name: " String",
            price: "Number"
        }
    ],
    orderTotal : "Number"
})

module.exports = mongoose.model("orders", OrderSchema)