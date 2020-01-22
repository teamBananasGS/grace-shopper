/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = require('../db/models/product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    beforeEach(() => {
      Product.create({
        name: 'Yeezys',
        price: 250.0,
        category: 'shoe',
        stock: 15,
        description: 'A shoe that looks cool'
      })
      Product.create({
        name: 'Jordans',
        price: 300.0,
        category: 'shoe',
        stock: 30,
        description: 'Flight shoes'
      })
    })
    // CHECKS API/PRODUCT ROUTE MAKES SURE PRODUCTS ARE INSIDE AN ARRAY AND CORRECT LENGTH
    it('Should be an array with a req.body length of amount of shoes', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(2)
    })

    // CHECKS API/PRODUCTS/CATEGORY ROUTE
    it('Gets Products based on shoe category', async () => {
      const res = await request(app)
        .get('/api/products/shoe')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].category).to.be.equal('shoe')
    })
    // CHECKS API/PRODUCTS/CATEGORY/ID ROUTE
    it('Grabs a Product based on Id', async () => {
      const res = await request(app)
        .get('/api/products/shoe/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Jordans')
    })

    // CHECKS POST API/PRODUCT
    it('creates a new product', async () => {
      const res = await request(app)
        .post('/api/products/')
        .send({
          name: 'Flight',
          price: 190,
          category: 'shoe',
          stock: 23,
          description: 'Gives you stylish feedback'
        })
      expect(res.body).to.be.an('object')
    })
  })
})
