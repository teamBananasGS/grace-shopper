// const {expect} = require('chai')
// const db = require('../index')
// const Order = db.model('order')
// const User = db.model('user')

// describe('User/Order association', () => {
//   // defined in ../server/models/index.js
//   let User1, User2;

//   beforeEach(async () => {
//     User1 = await User.create({
//       userId: 1,
//       firstName: 'John',
//       lastName: 'Diaz',
//       email: 'diaz@gmail.com',
//       password: '0567',
//       address: 'manor hill',
//       telephone: 123455,
//     });

//     await Order.create({
//       id: 2,
//       userId: 1,
//     });
//   });

//     it('has associated students', async () => {
//       const result = await User1.hasOneMany(Order) => {
//       expect(result).to.be.true;
//     });
//   })
