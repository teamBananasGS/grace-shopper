/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('products')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    beforeEach(() => {
      return Product.create({
        name: 'Yeezys',
        price: 250.0,
        category: 'Shoe',
        stock: 15,
        description: 'A shoe that looks cool'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body[0].category).to.be.equal('Shoe')
      expect(res.body[0].name).to.be.equal('Yeezys')
    })
  })
})
