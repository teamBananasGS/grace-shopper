const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define(
  'orderProduct',
  {
    quantityPurchased: {
      type: Sequelize.INTEGER
    },
    pricePerItem: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    getterMethods: {
      subtotal: function() {
        return this.quantityPurchased * this.pricePerItem
      }
    }
  }
)

module.exports = OrderProduct
