const express = require('express')

const { productsRouter } = require("./products.router")
const { usersRouter } = require("./users.router")

const { ProductsService } = require('../services/products.services')
const { Users } = require('../services/users.services')

const router = express.Router()

function indexRouter(app) {
  global.productsService = new ProductsService()
  global.usersService = new Users(global.productsService)

  router.use('/products', productsRouter)
  router.use('/users', usersRouter)

  app.use('/api/v1', router)
}

module.exports = { indexRouter }
