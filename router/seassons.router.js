const express = require('express')
const { Seassons } = require('../services/seassons.services')

const router = express.Router()
const service = new Seassons()

router.get('/', (req, res) => {
  const seassons = service.getAll()
  res.status(200).json(seassons)
})

router.get('/:seassonId', (req, res) => {
  const { seassonId } = req.params
  const { productId } = req.query

  const seasson = service.getOne(seassonId, +productId)

  if (!seasson) {
    res.status(404).send('Not found')
  }

  res.status(200).json(seasson)
})

router.post('/', (req, res) => {
  const body = req.body
  service.create(body)

  res.json(body)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body
  const user = service.update(id, body)

  res.json(user)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  service.delete(id)

  res.status(200).json('Deleted')
})

module.exports = { seassonsRouter: router }
