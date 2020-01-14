const User = require('./user')
const Products = require('./products')
const Order = require('./order')
const ShoppingCart = require('./shoppingCart')
const ShoppingCartDetails = require('./shoppingCartDetails')
const ProductOrder = require('./productOrder')
const PaymentMethod = require('./paymentMethod')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Order)
User.hasOne(ShoppingCart)
Order.belongsTo(User)
Products.belongsToMany(ShoppingCart, {through: ShoppingCartDetails})
ShoppingCart.belongsToMany(Products, {through: ShoppingCartDetails})
Products.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Products, {through: ProductOrder})
Order.belongsTo(PaymentMethod)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Products,
  Order,
  ProductOrder,
  PaymentMethod,
  ShoppingCart,
  ShoppingCartDetails
}
