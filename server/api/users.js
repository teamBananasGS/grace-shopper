const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
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
