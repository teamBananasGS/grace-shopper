const router = require('express').Router()
const protector = require('../auth/protector')
const {User, Order} = require('../db/models')

module.exports = router

router.get('/', protector.isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({})
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
