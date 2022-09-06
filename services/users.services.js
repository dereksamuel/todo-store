const faker = require('faker')
const { Schema } = require('./schema.services')

function initialStates() {
  const users = []

  for(let index = 0; index <= 100; index++) {
    users.push({
      id: faker.datatype.uuid(),
      fullname: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(20),
      products: [],
    })
  }

  return users
}

class Users extends Schema {
  constructor() {
    const users = initialStates()
    super(users)
  }
}

module.exports = { Users }
