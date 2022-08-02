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

module.exports = router