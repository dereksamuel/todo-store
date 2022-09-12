const boom = require('@hapi/boom')
const faker = require('faker')

class Schema {
  constructor(data) {
    this.data = data
  }

  async getAll() {
    return new Promise((res) => {
      const timeout = setTimeout(() => {
        res(this.data)
        clearTimeout(timeout)
      }, 2000)
    })
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
    const index = this.getOne(id, 'findIndex')

    this.data[index] = {
      ...this.data[index],
      ...changes
    }
    return this.data[index]
  }

  getOne(id, type = 'find', errorMessageNotFound) {
    const dataFound = this.data[type]((item) => item.id === id)

    if (dataFound === -1 || (!dataFound && dataFound !== 0)) {
      throw boom.notFound(errorMessageNotFound || 'Object not found')
    }

    if (dataFound.isBlock) {
      throw boom.conflict('Object is blocked')
    }

    return dataFound
  }

  async delete(id) {
    const index = this.getOne(id, 'findIndex')
    this.data.splice(index, 1)
    return id
  }
}

module.exports = { Schema }
