/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const protector = require('../auth/protector')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users', () => {
    const kensEmail = 'kenBill@email.com'

    beforeEach(() => {
      return User.create({
        firstName: 'Ken',
        lastName: 'Bill',
        email: kensEmail,
        password: '143',
        telephone: '1234567',
        isAdmin: true
      })
    })

    it('GET /api/users', protector.isAdmin, async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(kensEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
