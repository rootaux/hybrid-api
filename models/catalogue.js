const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: "String",
    price: "Number"
})

const CatalogueSchema = new mongoose.Schema({
    sellerId : {
        type: mongoose.Schema.ObjectId, ref: 'users'
    },
    products : [ProductSchema]
})

module.exports = mongoose.model("catalogue", CatalogueSchema)