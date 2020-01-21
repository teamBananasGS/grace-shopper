'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  PaymentMethod,
  OrderProduct,
  Order,
  ProductKey
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
    }),
    User.create({
      firstName: 'Lois',
      lastName: 'Lane',
      email: 'lois@gmail.com',
      address: 'Daily Planet',
      telephone: 1234567,
      password: '123'
    }),
    User.create({
      firstName: 'Tony',
      lastName: 'Stark',
      email: 'stark@gmail.com',
      address: 'Manhattan',
      telephone: 123467,
      password: '123',
      isAdmin: true
    })
  ])

  const productKey = await Promise.all([
    ProductKey.create({
      product: 'watch'
    }),
    ProductKey.create({
      product: 'suit'
    }),
    ProductKey.create({
      product: 'shoe'
    })
  ])

  const product = await Promise.all([
    // ============= SUITS =================
    Product.create({
      name: 'The OG Power Suit',
      price: 500.0,
      category: 'suit',
      productkeyId: productKey[1].id,
      stock: 10,
      description: 'A suit that makes you invincible',
      imageUrl: 'https://i.imgur.com/8xq4yCI.png'
    }),
    Product.create({
      name: 'GoldMember Suit',
      price: 500.0,
      category: 'suit',
      productkeyId: productKey[1].id,
      stock: 56,
      description:
        'A suit that allows you to shoot Gold bars out of your mouth',
      imageUrl: 'https://i.imgur.com/ldjOBfm.png'
    }),
    Product.create({
      name: 'Love Suit',
      price: 500.0,
      category: 'suit',
      productkeyId: productKey[1].id,
      stock: 56,
      description:
        'A suit that will make anyone you touch fall in love with you',
      imageUrl: 'https://i.imgur.com/LYfvDGD.png'
    }),
    Product.create({
      name: 'Aqua Suit',
      price: 500.0,
      category: 'suit',
      productkeyId: productKey[1].id,
      stock: 56,
      description: 'A suit that gives you the ability to swim 100mph',
      imageUrl: 'https://i.imgur.com/RYbe5Bl.png'
    }),
    Product.create({
      name: 'BlueBerry Suit',
      price: 500.0,
      category: 'suit',
      productkeyId: productKey[1].id,
      stock: 20,
      description: 'Suit that forever smells like Blueberries',
      imageUrl: 'https://i.imgur.com/kllvxkv.png'
    }),

    Product.create({
      name: 'Rich Suit',
      price: 1000.0,
      category: 'suit',
      productkeyId: productKey[1].id,
      stock: 10,
      description: 'A suit that gives you unlimited cash',
      imageUrl: ' https://i.imgur.com/8OcCJ5v.png'
    }),
    // ============= WATCHES =================
    Product.create({
      name: 'Slow-Motion Watch',
      price: 1500.0,
      category: 'watch',
      productkeyId: productKey[0].id,
      stock: 10,
      description: 'A watch that can slow down time',
      imageUrl: 'https://i.imgur.com/BhUEgLo.png'
    }),
    Product.create({
      name: 'Croc Watch',
      price: 200.0,
      category: 'watch',
      productkeyId: productKey[0].id,
      stock: 50,
      description: 'You can turn into a Crocodile whenever You please',
      imageUrl: 'https://i.imgur.com/bXLnNXj.png'
    }),
    Product.create({
      name: 'Banana Watch',
      price: 200.0,
      category: 'watch',
      productkeyId: productKey[0].id,
      stock: 50,
      description: 'Shoots out banana peels when being chased',
      imageUrl: 'https://i.imgur.com/uSEr2C2.png'
    }),
    Product.create({
      name: 'Roly Rolex',
      price: 9999.0,
      category: 'watch',
      productkeyId: productKey[0].id,
      stock: 100,
      description: 'The Roly Rolex will let you get into any Nightclub/lounge',
      imageUrl: 'https://i.imgur.com/c9WpcCN.png'
    }),
    Product.create({
      name: 'The Teleporter',
      price: 5000.0,
      category: 'watch',
      productkeyId: productKey[0].id,
      stock: 5,
      description:
        'The Teleporter will allow you to teleport too any country you choose',
      imageUrl: ' https://i.imgur.com/yQ8bIMY.jpg'
    }),
    // ============= SHOES =================
    Product.create({
      name: 'Metallic Shoe',
      price: 250.0,
      category: 'shoe',
      productkeyId: productKey[2].id,
      stock: 15,
      description:
        'A shoe that looks cool, and has ability to turn your skin into Metal',
      imageUrl: 'https://i.imgur.com/yniVYD7.png'
    }),

    Product.create({
      name: 'Fire Shoe',
      price: 150.0,
      category: 'shoe',
      productkeyId: productKey[2].id,
      stock: 20,
      description: 'A shoe that is fireproof and also fire',
      imageUrl: 'https://i.imgur.com/qYFRzx3.png'
    }),
    Product.create({
      name: 'Dad Shoe',
      price: 150.0,
      category: 'shoe',
      productkeyId: productKey[2].id,
      stock: 20,
      description:
        'Once you try them on a baby is born somewhere & you become a dad',
      imageUrl: 'https://i.imgur.com/Wnh7D2E.png'
    }),
    Product.create({
      name: 'WaterWalkers',
      price: 200.0,
      category: 'shoe',
      productkeyId: productKey[2].id,
      stock: 50,
      description: 'Lets you walk on water',
      imageUrl: 'https://i.imgur.com/upTr6ju.png'
    }),
    Product.create({
      name: 'Breddas',
      price: 200.0,
      category: 'shoe',
      productkeyId: productKey[2].id,
      stock: 50,
      description: 'lets you jump 50 stories high and absorbs the impact',
      imageUrl: 'https://i.imgur.com/LGNx554.png'
    }),
    Product.create({
      name: 'Algo 300',
      price: 200.0,
      category: 'shoe',
      productkeyId: productKey[2].id,
      stock: 25,
      description:
        'Shoe that lets you know every answer to any algorithm in existence',
      imageUrl: 'https://i.imgur.com/QIjVNtD.png'
    }),
    Product.create({
      name: 'Sun Absorbers V2',
      price: 1500.0,
      category: 'shoe',
      productkeyId: productKey[2].id,
      stock: 25,
      description: 'Shoe that absorbs the suns Power & makes you ageless',
      imageUrl: 'https://i.imgur.com/xGAhTkV.png'
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
      paymentMethodId: 1
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
