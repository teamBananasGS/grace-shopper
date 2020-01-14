const Sequelize = require('sequelize')
const db = require('../db')

const ShoppingCart = db.define('shoppingcart', {
  shoppingCartId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = ShoppingCart
