const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {
    let ogSuit

    beforeEach(async () => {
      ogSuit = await Product.create({
        name: 'ogSuit',
        price: 1000.0,
        category: 'suit',
        stock: 24,
        description: 'Suit that gives you superman like powers'
      })
    })
    // CHECKS THAT A NAME ATLEAST HAS 1 CHARACTER
    it('requires name field to not be empty', () => {
      expect(ogSuit.name).length.to.be.greaterThan(1)
    })
    it('requires stock to be type of INTEGER', () => {
      expect(typeof ogSuit.name).to.be.equal('string')
    })
  })

  describe('Correct Category', () => {
    let flameSuit
    let woodShoes

    beforeEach(async () => {
      flameSuit = await Product.create({
        name: 'Fire Suit',
        price: 200.0,
        category: 'suit',
        stock: 24,
        description: 'Suit that gives ability to shoot flames'
      })
      woodShoes = await Product.create({
        name: 'wood Shoes',
        price: 150.0,
        category: 'shoe',
        stock: 24,
        description: 'shoes that make your legs into trees'
      })
    })
    // CHECKS THAT SUIT HAS PROPER CATEGORY
    it('returns true if product category for Fire Suit equals suit', () => {
      expect(flameSuit.category).to.be.equal('suit')
    })
    // CHEKCS THAT SHOE HAS PROPER CATEGORY
    it('returns false if woodShoes category does not equal `shoe`', () => {
      expect(woodShoes.category).to.be.equal('shoe')
    })
    // CHECKS THAT PRODUCT PRICE HAS TWO DECIMAL VALUES
    it('returns true if the product price has two decimals', () => {
      expect(Number(flameSuit.price)).to.be.equal(200.0)
    })
  })

  describe('Is Not UnderPriced', () => {
    let waterSuit

    beforeEach(async () => {
      waterSuit = await Product.create({
        name: 'Water Suit',
        price: 400.0,
        category: 'suit',
        stock: 30,
        description: 'This water suit will give you fish-like gills'
      })
    })
    // CHECKS THAT WE ARE NOT ADDING CHEAP INVENTORY
    it('returns true if suit cost is atleast $100', () => {
      expect(Number(waterSuit.price)).to.be.greaterThan(100.0)
    })
  })

  describe('Has Stock available', () => {
    let veganSuit

    beforeEach(async () => {
      veganSuit = await Product.create({
        name: 'vegan Suit',
        price: 150.0,
        category: 'suit',
        stock: 1,
        description: 'Suit will make you a vegan'
      })
    })
    // CHECKS THAT WE ARE ADDING ATLEAST 1 IN STOCK WHEN CREATING NEW PRODUCT
    it('requires stock to atleast be atleast 1 when creating an instance', () => {
      expect(Number(veganSuit.stock)).to.be.greaterThan(0)
    })
  })
})
