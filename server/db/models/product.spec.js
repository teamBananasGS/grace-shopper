const {expect} = require('chai')
const db = require('../index')
const Products = db.model('products')

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Correct Category', () => {
    let flameSuit

    beforeEach(async () => {
      flameSuit = await Products.create({
        name: 'Fire Suit',
        price: 200.0,
        category: 'Suit',
        stock: 24,
        description: 'Suit that gives ability to shoot flames'
      })
    })

    it('returns true if product category is a Suit', () => {
      expect(flameSuit.category).to.be.equal('Suit')
    })

    it('returns true if the product price has two decimals', () => {
      expect(Number(flameSuit.price)).to.be.equal(200.0)
    })
  })

  describe('Is Not Cheap', () => {
    let waterSuit

    beforeEach(async () => {
      waterSuit = await Products.create({
        name: 'Water Suit',
        price: 4.0,
        category: 'Suit',
        stock: 30,
        description: 'This water suit will give you fish-like gills'
      })
    })

    it('returns true if suit cost is atleast 1.00', () => {
      expect(Number(waterSuit.price)).to.be.greaterThan(1.0)
    })
  })
})
