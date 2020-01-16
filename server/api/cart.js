const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

// SERVES UP USER CART
router.get('/:userId', async (req, res, next) => {
  try {
    const user = req.params.userId
    const cartProducts = await Order.findAll({
      where: {
        userId: user,
        status: 'pending'
      },
      include: [{model: Product}]
    })
    res.json(cartProducts)
  } catch (err) {
    next(err)
  }
})
