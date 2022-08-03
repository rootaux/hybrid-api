const Order = require('../../models/orders')
const Catalogue = require('../../models/catalogue')

const saveCatalogue = async ({ sellerId, products }) => {
  const count = await Catalogue.find({
    sellerId
  })
  if (count.length > 0) {
    throw new Error('Catalogue already exists!')
  }
  const catalogue = await new Catalogue({
    sellerId,
    products
  }).save()
  return catalogue
}

const getOrders = async ({ sellerId }) => {
  const orderList = await Order.find({
    sellerId
  })
  return orderList
}

module.exports.saveCatalogue = saveCatalogue
module.exports.getOrders = getOrders
