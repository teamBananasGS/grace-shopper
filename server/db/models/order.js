const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate: {
      allowNull: false,
      isEmpty: false
    }
  }
})

module.exports = {
  Order
}
