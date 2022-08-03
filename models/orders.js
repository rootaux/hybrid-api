const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.ObjectId, ref: 'users'
  },
  sellerId: {
    type: mongoose.Schema.ObjectId, ref: 'users'
  },
  products: [
    {
      productId: 'String',
      name: 'String',
      price: 'Number',
      _id: false
    }
  ],
  orderTotal: 'Number'
})

module.exports = mongoose.model('orders', OrderSchema)