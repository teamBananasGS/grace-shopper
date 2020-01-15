const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Pending', 'Complete', 'Canceled']]
    },
    defaultValue: 'Pending'
  },
  datePurchased: Sequelize.DATEONLY
})

module.exports = Order
