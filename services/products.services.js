const faker = require('faker')
const { Schema } = require('./schema.services')

function selectSeasson() {
  const seasson = Math.trunc(Math.floor(Math.random() * 4))
  const seassons = {
    1: 'winter',
    2: 'summer',
    3: 'spring'
  }

  return seassons[seasson] || 'fall'
}

function initialStates() {
  const products = []

  for (let index = 0; index <= 100; index++) {
    products.push({
      id: faker.datatype.uuid(),
      kind_of: selectSeasson(),
      name: faker.commerce.productName(),
      description: faker.company.bs(),
      src_image: faker.image.imageUrl(),
      ammount: +faker.finance.amount(),
      price: +faker.commerce.price(),
      offert: Math.trunc(Math.ceil(Math.random() * 70)),
      location: faker.address.country(),
      isBlock: faker.datatype.boolean()
    })
  }

  return products
}

class ProductsService extends Schema {
  constructor() {
    const products = initialStates()
    super(products)
  }
}

module.exports = { ProductsService }
