const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Orders model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Status of an Order', () => {
    let testOrder

    beforeEach(async () => {
      testOrder = await Order.create({
        status: 'complete'
      })
    })
    // ORDER STATUS IS COMPLETE ONCE ORDER IS FINALIZED
    it('returns an order status of complete', () => {
      expect(testOrder.status).to.be.equal('complete')
    })
  })

  describe('returns default status of pending if no status has been provided', () => {
    let testOrder

    beforeEach(async () => {
      testOrder = await Order.create()
    })
    // ORDER STATUS IS SET AS PENDING FROM THE START OF AN INSTANCE
    it('returns default status of pending if no status has been provided', () => {
      expect(testOrder.status).to.be.equal('pending')
    })
  })
})
