const router = require('express').Router()
const {Order, PaymentMethod, User} = require('../db/models')

module.exports = router

router.put('/', async (req, res, next) => {
  try {
    const paymentId = await PaymentMethod.findOne({
      where: {
        name: req.body.data.paymentName
      }
    })
    const date = new Date()
    await Order.update(
      {
        datePurchased: date,
        status: 'complete',
        paymentMethodId: paymentId.dataValues.id
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
