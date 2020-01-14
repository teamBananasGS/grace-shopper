const Sequelize = require('sequelize')
const db = require('../db')

const PaymentMethod = db.define('paymentMethod', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      allowNull: false,
      isEmpty: false
    }
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      allowNull: false,
      isEmpty: false
    }
  }
})

module.exports = PaymentMethod
