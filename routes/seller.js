const express = require("express")
const router = express.Router()
const auth = require("./middleware/auth")
const SellerService = require("./services/sellerService")
const jwt = require('jsonwebtoken');

router.route("/create-catalog").post(auth, async (req, res) => {
    try {
        if( req.user.userType == "buyer"){
            throw new Error("Only sellers can use this service.")
        }
        const { products } = req.body;
        if (products.length == 0) {
            throw new Error("Empty product list!")
        }
        const sellerId = req.user.id
        const user = await SellerService.saveCatalogue({
            sellerId,
            products
        })
        return res.json({
            message: "Product added to the catalogue successfully!!"
        })
    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message
        })
    }
})

router.route("/orders").get(auth, async (req, res) => {
    try {
        if( req.user.userType == "buyer"){
            throw new Error("Only sellers can use this service.")
        }
        const sellerId = req.user.id
        const ordersList = await SellerService.getOrders({
            sellerId
        })
        return res.json({
            orders: ordersList
        })
    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message
        })
    }
})

module.exports = router