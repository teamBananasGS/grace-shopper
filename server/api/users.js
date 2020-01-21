const router = require('express').Router()
const protector = require('../auth/protector')
const {User, Order, OrderProduct} = require('../db/models')

module.exports = router

// GETS ALL USERS (PROTECTED)
router.get('/', protector.isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Order,
          include: [{model: OrderProduct}]
        }
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/checkorder/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await Order.findOrCreate({
      where: {
        userId,
        status: 'pending'
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// CREATES NEW USER
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (err) {
    next(err)
  }
})
