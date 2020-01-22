const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(() => {
      return User.create({
        firstName: 'cody',
        lastName: 'zack',
        email: 'cody@gmail.com',
        password: '234',
        address: '125 manor hill',
        telephone: '123456'
      })
    })
    // NOBODY BUT AN ADMIN CAN ACCESS OUT API USER ROUTES
    it("Non Admin Users shouldn't be able to access the /api/users route", async () => {
      await request(app)
        .get('/api/users')
        .expect(401)
    })
  })

  // POST ROUTE CREATES NEW USER TEST MUST HAVE VALID FIELDS
  it('Creates a new user', async () => {
    const res = await request(app)
      .post('/api/users/')
      .send({
        firstName: 'Jon',
        lastName: 'Doe',
        email: 'jon@gmail.com',
        password: '1234',
        address: '125 manor hill',
        telephone: '123456'
      })
      .expect(200)
    expect(res.body).to.be.an('object')
    expect(res.body.firstName).to.be.equal('Jon')
  })
})
