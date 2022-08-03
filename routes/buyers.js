const express = require('express')
const router = express.Router()
const auth = require('./middleware/auth')
const BuyerService = require('./services/buyerService')

router.route('/list-of-sellers').get(async (req, res) => {
  const listOfSeller = await BuyerService.getSellers()
  return res.json({
    sellers: listOfSeller
  })
})

router.route('/seller-catalog/:seller_id').get(async (req, res) => {
  const sellerId = req.params.seller_id
  const listOfProducts = await BuyerService.getProducts(sellerId)
  return res.json({
    catalogue: listOfProducts
  })
})

router.route('/create-order/:seller_id').post(auth, async (req, res) => {
  try {
    if (req.user.userType === 'seller') {
      throw new Error('Only buyers can use this service.')
    }
    const buyerId = req.user.id
    const sellerId = req.params.seller_id
    const itemsToBuy = req.body.products
    const order = await BuyerService.makeOrder({ itemsToBuy, sellerId, buyerId })
    return res.json({
      message: 'Order placed successfully!',
      total: order.orderTotal
    })
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message
    })
  }
})

module.exports = router