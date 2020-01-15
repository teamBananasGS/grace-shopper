'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  PaymentMethod,
  OrderProduct,
  Order
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bat@gmail.com',
      address: 'Wayne Manor, 1007 Mountain Drive, Gotham',
      telephone: 1234567,
      password: '123'
    }),
    User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'abc@gmail.com',
      address: '123 ABC Street',
      telephone: 1234567,
      password: '123'
    })
  ])

  const product = await Promise.all([
    Product.create({
      name: 'Power Suit',
      price: 500.0,
      category: 'suit',
      stock: 56,
      description: 'A suit that gives you power'
    }),
    Product.create({
      name: 'Power Watch',
      price: 1500.0,
      category: 'watch',
      stock: 10,
      description: 'A watch that gives you power'
    }),
    Product.create({
      name: 'Flexing Shoe',
      price: 250.0,
      category: 'shoe',
      stock: 15,
      description: 'A shoe that looks cool'
    })
  ])

  const payments = await Promise.all([
    PaymentMethod.create({
      name: 'Credit Card'
    }),
    PaymentMethod.create({
      name: 'Venmo'
    }),
    PaymentMethod.create({
      name: 'PayPal'
    })
  ])

  const order = await Promise.all([
    Order.create({
      userId: 1,
      paymentMethodId: 1,
      status: 'Complete'
    })
  ])

  const orderProducts = await Promise.all([
    OrderProduct.create({
      productId: 1,
      orderId: 1,
      quantityPurchased: 3,
      pricePerItem: 500
    }),
    OrderProduct.create({
      productId: 2,
      orderId: 1,
      quantityPurchased: 1,
      pricePerItem: 1500
    }),
    OrderProduct.create({
      productId: 3,
      orderId: 1,
      quantityPurchased: 2,
      pricePerItem: 250
    })
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
