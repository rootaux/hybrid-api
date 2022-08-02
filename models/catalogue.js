const mongoose = require("mongoose")

const CatalogueSchema = new mongoose.Schema({
    sellerId : {
        type: mongoose.Schema.ObjectId, ref: 'users'
    },
    products : [
        {
            name : "String",
            price : "Number"
        }
    ]
})

module.exports = mongoose.model("catalogue", CatalogueSchema)