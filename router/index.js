const express = require('express')

const { productsRouter } = require("./products.router")
const { seassonsRouter } = require("./seassons.router")
const { usersRouter } = require("./users.router")

const router = express.Router()

function indexRouter(app) {
  router.use('/products', productsRouter)
  router.use('/seassons', seassonsRouter)
  router.use('/users', usersRouter)

  app.use('/api/v1', router)
}

module.exports = { indexRouter }
