const router = require('express').Router()
const {Order, PaymentMethod, OrderProduct} = require('../db/models')
const protector = require('../auth/protector')

module.exports = router

router.put('/:userId', protector.isUser, async (req, res, next) => {
  try {
    const payment = await PaymentMethod.findOne({
      where: {
        name: req.body.data.paymentName
      }
    })
    const date = new Date()
    await Order.update(
      {
        datePurchased: date,
        status: 'complete',
        paymentMethodId: payment.dataValues.id
      },
      {
        where: {
          id: req.body.data.orderId,
          userId: req.body.data.userId
        }
      }
    )
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.post('/guest', async (req, res, next) => {
  try {
    const guestCart = req.body.guestCart
    const payment = await PaymentMethod.findOne({
      where: {
        name: req.body.paymentMethod
      }
    })

    const datePurchased = new Date()
    const order = await Order.create({
      status: 'complete',
      datePurchased,
      paymentMethodId: payment.dataValues.id
    })

    for (let product of guestCart) {
      await OrderProduct.create({
        quantityPurchased: product.quantity,
        pricePerItem: product.price,
        productId: product.id,
        orderId: order.dataValues.id
      })
    }
    res.json(order)
  } catch (err) {
    next(err)
  }
})
