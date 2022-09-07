const boom = require('@hapi/boom')
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
  constructor(productsService) {
    const users = initialStates();
    super(users);

    this.productsService = productsService;
  }

  async update(id, changes) {
    const index = this.getOne(id, "findIndex");
    const usersPromises = [];

    const functionality = () => {
      this.data[index] = {
        ...this.data[index],
        ...changes
      };
      return this.data[index];
    };

    if (changes.products && changes.products.length) {
      changes.products.map((id) => {
        usersPromises.push(this.productsService.getOne(id, "find", "Your products does'nt exist"));
      })

      try {
        await Promise.all(usersPromises);
        return functionality();
      } catch (error) {
        throw boom.badRequest("Your products does'nt exist");
      }
    } else {
      return functionality();
    }
  }
}

module.exports = { Users }
