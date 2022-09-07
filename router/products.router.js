const express = require('express')
const { ProductsService } = require('../services/products.services')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => {
  const products = await service.getAll()

  res.status(200).json(products)
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await service.getOne(id)
    res.status(200).send(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  await service.create(body)

  res.status(201).json(body)
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  const body = req.body

  try {
    const product = await service.update(id, body)

    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    await service.delete(id)

    res.status(200).json('Deleted')
  } catch (error) {
    next(error)
  }
})

module.exports = { productsRouter: router }
