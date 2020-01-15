const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantityPurchased: {
    type: Sequelize.INTEGER
  },
  pricePerItem: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderProduct
