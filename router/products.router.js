const express = require('express')
const { ProductsService } = require('../services/products.services')

const router = express.Router()
const service = new ProductsService()

router.get('/', (req, res) => {
  const products = service.getAll()

  res.status(200).json(products)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const product = service.getOne(id)

  if (!product) {
    res.status(404).send('Not found')
    return
  }

  res.status(200).send(product)
})

router.post('/', (req, res) => {
  const body = req.body
  service.create(body)

  res.status(201).json(body)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  const product = service.update(id, body)

  res.json(product)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  service.delete(id)

  res.status(200).json('Deleted')
})

module.exports = { productsRouter: router }
