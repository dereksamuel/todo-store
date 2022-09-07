const faker = require("faker");

class Schema {
  constructor(data) {
    this.data = data
  }

  async getAll() {
    return new Promise((res) => {
      const timeout = setTimeout(() => {
        res(this.data);
        clearTimeout(timeout);
      }, 2000);
    })
  }

  async getOne(id) {
    if (!id) {
      // eslint-disable-next-line no-console
      console.error('The id is necessary')
      return;
    }

    return this.data.find((item) => item.id === id)
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.data.push(newProduct)
    return
  }

  async update(id, changes) {
    const index = this.data.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('Object not found')
    }

    this.data[index] = {
      ...this.data[index],
      ...changes
    }
    return this.data[index]
  }

  async delete(id) {
    const index = this.data.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('Object not found')
    }

    this.data.splice(index, 1)
    return id
  }
}

module.exports = { Schema }
