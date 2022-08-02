const mongoose = require("mongoose")
const catalogue = require("../../models/catalogue")
const Catalogue = require("../../models/catalogue")

const saveCatalogue = async ({ sellerId, products }) => {
    const count = await Catalogue.find({
        sellerId: sellerId
    })
    if (count.length > 0) {
        throw new Error("Catalogue already exists!")
    }
    const catalogue = await new Catalogue({
        sellerId,
        products
    }).save()
    return catalogue
}


module.exports.saveCatalogue = saveCatalogue