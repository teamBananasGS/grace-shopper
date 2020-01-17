const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProduct')

const Order = db.define(
  'order',
  {
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
        isIn: [['pending', 'complete', 'canceled']]
      },
      defaultValue: 'pending'
    },
    datePurchased: {
      type: Sequelize.DATE
    }
  },
  {
    getterMethods: {
      totalCost() {
        return OrderProduct.findAll({
          where: {
            orderId: this.id
          }
        }).then(order => {
          let output = 0
          order.forEach(ord => {
            output += ord.subtotal
          })
          return output
        })
      }
    }
  }
)

module.exports = Order
