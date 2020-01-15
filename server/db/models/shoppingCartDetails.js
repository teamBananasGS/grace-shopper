const Sequelize = require('sequelize')
const db = require('../db')

const ShoppingCartDetails = db.define('shoppingcartdetails', {
  itemQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  itemPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'http://tny.im/kqt'
  }
})

module.exports = ShoppingCartDetails
