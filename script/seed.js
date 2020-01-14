'use strict'

const db = require('../server/db')
const {User, Products, PaymentMethod} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'the_bat_cave@gmail.com',
      address: 'Wayne Manor, 1007 Mountain Drive, Gotham',
      telephone: 1234567,
      password: '123'
    })
  ])

  const products = await Promise.all([
    Products.create({
      name: 'Power Suit',
      price: 500.0,
      category: 'Suit',
      stock: 56,
      description: 'A suit that gives you power'
    }),
    Products.create({
      name: 'Power Watch',
      price: 1500.0,
      category: 'Watch',
      stock: 56,
      description: 'A watch that gives you power'
    }),
    Products.create({
      name: 'Flexing Shoe',
      price: 250.0,
      category: 'Shoe',
      stock: 15,
      description: 'A shoe that looks cool'
    })
  ])

  const payments = await Promise.all([
    PaymentMethod.create({
      id: 1,
      name: 'Credit Card'
    })
  ])

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${payments.length} payment methods`)
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
