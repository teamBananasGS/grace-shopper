const {expect} = require('chai')
const db = require('../index')
const Products = db.model('products')

describe('Products model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correctCategory', () => {
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

    it('returns true if the product is a suit', () => {
      expect(flameSuit.category).to.be.equal('Suit')
    })

    it('returns true if the price has two decimals', () => {
      expect(flameSuit.price).to.be.equal('200.00')
    })
  })

  // describe('Is Not Cheap', () => {
  //   let waterSuit

  //   beforeEach(async () => {
  //     waterSuit = await Products.create({
  //       name: 'Water Suit',
  //       price: 4,
  //       category: 'Suit',
  //       stock: 30,
  //       description: 'This water suit will give you fish-like gills',
  //     })
  //   })

  //   it('returns true if suit cost is atleast 0.01', () => {
  //     expect(waterSuit.price).to.be.greaterThan('3.00')
  //   })
  // })
})
