const Sequelize = require('sequelize')
const db = require('../db')

const ProductKey = db.define('productkey', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  product: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = ProductKey
