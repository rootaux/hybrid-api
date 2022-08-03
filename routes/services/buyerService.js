const User = require('../../models/users')
const Catalogue = require('../../models/catalogue')
const Order = require('../../models/orders')

const getSellers = async () => {
  const listOfSellers = await User.find({
    userType: 'seller'
  }).select('username _id')
  return listOfSellers
}

const getProducts = async (sellerId) => {
  const listOfProducts = await Catalogue.find({
    sellerId
  }).select('products -_id')
  return listOfProducts
}

const makeOrder = async ({ itemsToBuy, sellerId, buyerId }) => {
  let catalogueProducts = await Catalogue.find({
    sellerId
  }).select('products -_id')
  if (catalogueProducts.length === 0) {
    throw new Error('Seller does not have any products!')
  }
  catalogueProducts = catalogueProducts[0].products
  let totalPrice = 0
  const buyItems = []
  itemsToBuy.forEach(item => {
    catalogueProducts.forEach(dbItem => {
      if (item.name === dbItem.name) {
        totalPrice += dbItem.price
        buyItems.push({ productId: dbItem._id.toString(), name: item.name, price: dbItem.price })
      }
    })
  })
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