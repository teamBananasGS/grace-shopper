const router = require('express').Router()
const Products = require('../db/models/products')
module.exports = router

// SERVES ALL PRODUCTS
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// SERVES ONE PRODUCT BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const oneProduct = await Products.findOne({
      where: {
        id: req.params.id
      }
    })
    res.send(oneProduct)
  } catch (err) {
    next(err)
  }
})
