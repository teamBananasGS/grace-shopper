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
          firstName: 'Dan',
          lastName: 'Tannehill',
          email: 'dan@email.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(dan.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(dan.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
