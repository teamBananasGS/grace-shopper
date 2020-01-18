const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')

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

router.put('/update/:productId', async (req, res, next) => {
  let quantity = req.body.data.quantity
  console.log(req.body.data)
  try {
    const productId = req.params.productId
    await OrderProduct.update(
      {quantityPurchased: quantity},
      {
        where: {
          productId: productId
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
    await OrderProduct.create(req.body)
    res.sendStatus(204)
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
