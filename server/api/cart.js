const router = require('express').Router()
const {
  User,
  Product,
  Order,
  OrderProduct,
  PaymentMethod,
  ProductKey
} = require('../db/models/')

module.exports = router

// SERVES UP USER CART
router.get('/cart/:userId', async (req, res, next) => {
  try {
    const user = req.params.userId
    const cartProducts = await Order.findAll({
      where: {
        userId: user,
        status: 'pending'
      },
      include: [{model: OrderProduct}]
    })
    res.json(cartProducts)
  } catch (err) {
    next(err)
  }
})
