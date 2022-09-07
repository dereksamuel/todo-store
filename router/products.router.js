const express = require('express')

// schemas
const { validatorHandler } = require('../middlewares/validator.handler')
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/products.schema')

const router = express.Router()

router.get('/', async (req, res) => {
  const products = await global.productsService.getAll()

  res.status(200).json(products)
})

router.get('/:id',
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await global.productsService.getOne(id)
    res.status(200).send(product)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
  const body = req.body
  await global.productsService.create(body)

  res.status(201).json(body)
})

router.patch('/:id',
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
  const { id } = req.params
  const body = req.body

  try {
    const product = await global.productsService.update(id, body)

    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    await global.productsService.delete(id)

    res.status(200).json('Deleted')
  } catch (error) {
    next(error)
  }
})

module.exports = { productsRouter: router }
