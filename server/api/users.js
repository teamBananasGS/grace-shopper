const router = require('express').Router()
const {User} = require('../db/models')
const protector = require('../auth/protector')
module.exports = router

router.get('/', protector.isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({})
    res.json(users)
  } catch (err) {
    next(err)
  }
})
