const faker = require("faker");
const { Schema } = require("./schema.services");

class Seassons extends Schema {
  constructor() {
    const seassons = [
      {
        kind_of: 'summer',
        id: faker.datatype.uuid(),
        products: [ { id: 1 }, { id: 81 } ]
      },
      {
        kind_of: 'winter',
        id: faker.datatype.uuid(),
        products: [ { id: 3 }, { id: 891 } ]
      },
      {
        kind_of: 'spring',
        id: faker.datatype.uuid(),
        products: [ { id: 2 }, { id: 881 } ]
      },
      {
        kind_of: 'fall',
        id: faker.datatype.uuid(),
        products: [ { id: 5 }, { id: 871 } ]
      },
    ]
    super(seassons)
  }

  getOne(seassonId, productId) {
    if (!seassonId) {
      // eslint-disable-next-line no-console
      console.error('seassonId and productId are necessary')
      return;
    }

    const seasson = this.data.find((item) => item.id === seassonId)

    if (productId) {
      return seasson.products.find((product) => product.id === productId)
    }

    return seasson
  }
}

module.exports = { Seassons }
