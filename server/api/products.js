const router = require('express').Router()
const Product = require('../db/models/product')
const ProductKey = require('../db/models/product')
module.exports = router

// SERVES ALL PRODUCTS
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: ['category', 'name']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// SERVES ALL PRODUCTS BY CATEGORY
router.get('/:category', async (req, res, next) => {
  try {
    const categoryName = req.params.category
    const foundCategory = await Product.findAll({
      where: {
        category: categoryName
      }
    })
    res.send(foundCategory)
  } catch (err) {
    next(err)
  }
})

// SERVES ONE PRODUCT BY ID
router.get('/:category/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {
        category: req.params.category,
        id: req.params.productId
      }
    })
    res.send(singleProduct)
  } catch (err) {
    next(err)
  }
})

// UPDATES STOCK BY PRODUCT ID
router.put('/update/:productId', async (req, res, next) => {
  try {
    console.log(req.body.data)
    await Product.update(
      {stock: req.body.data.newQuantity},
      {
        where: {
          id: req.body.data.productId
        }
      }
    )
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
