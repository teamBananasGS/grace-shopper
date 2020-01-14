const Sequelize = require('sequelize')
const db = require('../db')

const ShoppingCart = db.define('shoppingcart', {
  userId: {
    type: Sequelize.INTEGER
  },
  itemId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  itemPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'http://tny.im/kqt'
  }
})

module.exports = ShoppingCart
