const express = require("express")
const router = express.Router()
const BuyerService = require("./services/buyerService")
const jwt = require('jsonwebtoken');

router.route("/list-of-sellers").get(async (req, res) => {
    const listOfSeller = await BuyerService.getSellers();
    return res.json({
        sellers: listOfSeller
    })
})

router.route("/seller-catalog/:seller_id").get(async (req, res) => {
    var sellerId = req.params.seller_id
    const listOfProducts = await BuyerService.getProducts(sellerId);
    return res.json({
        catalogue: listOfProducts
    })
})

module.exports = router