const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('order', {
  quantityPurchased: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      isDecimal: true
    }
  }
})

module.exports = {
  ProductOrder
}
