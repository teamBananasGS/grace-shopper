'use strict'

const db = require('../server/db')
const {
  User,
  Products,
  PaymentMethod,
  ShoppingCart,
  ShoppingCartDetails,
  ProductOrder,
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
      stock: 10,
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
      name: 'Credit Card'
    }),
    PaymentMethod.create({
      name: 'Venmo'
    }),
    PaymentMethod.create({
      name: 'PayPal'
    })
  ])

  const cart = await Promise.all([
    ShoppingCart.create({
      userId: 1
    })
  ])

  const cartDetails = await Promise.all([
    ShoppingCartDetails.create({
      productId: 1,
      shoppingcartId: 1,
      itemQuantity: 3,
      itemPrice: 500,
      totalPrice: 1500
    }),
    ShoppingCartDetails.create({
      productId: 2,
      shoppingcartId: 1,
      itemQuantity: 1,
      itemPrice: 1500,
      totalPrice: 1500
    }),
    ShoppingCartDetails.create({
      productId: 3,
      shoppingcartId: 1,
      itemQuantity: 2,
      itemPrice: 250,
      totalPrice: 500
    })
  ])

  const order = await Promise.all([
    Order.create({
      userId: 1,
      paymentMethodId: 1
    })
  ])

  const productOrder = await Promise.all([
    ProductOrder.create({
      productId: 1,
      orderId: 1,
      quantityPurchased: 3,
      totalPrice: 1500
    }),
    ProductOrder.create({
      productId: 2,
      orderId: 1,
      quantityPurchased: 1,
      totalPrice: 1500
    }),
    ProductOrder.create({
      productId: 3,
      orderId: 1,
      quantityPurchased: 2,
      totalPrice: 500
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
