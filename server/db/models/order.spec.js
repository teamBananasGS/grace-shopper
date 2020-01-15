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
        status: 'Complete'
      })
    })

    it('returns an order status of complete', () => {
      expect(testOrder.status).to.be.equal('Complete')
    })
  })

  describe('returns default status of pending if no status has been provided', () => {
    let testOrder

    beforeEach(async () => {
      testOrder = await Order.create()
    })

    it('returns default status of pending if no status has been provided', () => {
      expect(testOrder.status).to.be.equal('Pending')
    })
  })
})
