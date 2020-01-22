/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let dan

      beforeEach(async () => {
        dan = await User.create({
          firstName: '',
          lastName: 'Tannehill',
          email: 'dan@email.com',
          password: '123'
        })
      })

      it('returns true if the password is correct', () => {
        expect(dan.correctPassword('123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(dan.correctPassword('boness')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('Schema', () => {
    it('requires a "firstName" string', async () => {
      try {
        await User.create()
        throw new Error('User successfully created with no name')
      } catch (err) {
        expect(err.name).to.equal('SequelizeValidationError')
      }

      try {
        await User.create({firstName: ''})
        throw new Error('User successfully created with an empty name')
      } catch (err) {
        expect(err.name).to.equal('SequelizeValidationError')
      }
    })

    it('requires a "password" length to be atleast 2string', async () => {
      try {
        await User.create({password: '1'})
        throw new Error('User successfully created with a length less than 2')
      } catch (err) {
        expect(err.name).to.equal('SequelizeValidationError')
      }
    })
  }) // end describe ('Schema')
}) // end describe('User model')
