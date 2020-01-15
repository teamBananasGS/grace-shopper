const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

// SERVES ALL PRODUCTS
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// SERVES ALL SUITS
router.get('/suits', async (req, res, next) => {
  try {
    const suitCategory = await Product.findAll({
      where: {
        category: 'Suit'
      }
    })
    res.json(suitCategory)
  } catch (err) {
    next(err)
  }
})

// SERVES ALL WATCHES
router.get('/watches', async (req, res, next) => {
  try {
    const watchCategory = await Product.findAll({
      where: {
        category: 'Watch'
      }
    })
    res.json(watchCategory)
  } catch (err) {
    next(err)
  }
})

// SERVES ALL SHOES
router.get('/shoes', async (req, res, next) => {
  try {
    const shoeCategory = await Product.findAll({
      where: {
        category: 'Shoe'
      }
    })
    res.json(shoeCategory)
  } catch (err) {
    next(err)
  }
})

// SERVES ONE PRODUCT BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const oneProduct = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    res.send(oneProduct)
  } catch (err) {
    next(err)
  }
})
