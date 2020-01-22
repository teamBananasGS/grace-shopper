const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')

module.exports = router

// SERVES UP USER CART
// add protection on route
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

router.put('/update/:productId/:orderId', async (req, res, next) => {
  let quantity = req.body.data.quantity
  try {
    await OrderProduct.update(
      {quantityPurchased: quantity},
      {
        where: {
          productId: req.params.productId,
          orderId: req.params.orderId
        }
      }
    )
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.post('/update/:productId', async (req, res, next) => {
  try {
    const data = await OrderProduct.create(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/delete/:productId/:orderId', async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
