const express = require('express')
const { Seassons } = require('../services/seassons.services')

const router = express.Router()
const service = new Seassons()

router.get('/', async (req, res) => {
  const seassons = await service.getAll()
  res.status(200).json(seassons)
})

router.get('/:seassonId', async (req, res) => {
  const { seassonId } = req.params
  const { productId } = req.query

  const seasson = await service.getOne(seassonId, +productId)

  if (!seasson) {
    res.status(404).send('Not found')
  }

  res.status(200).json(seasson)
})

router.post('/', async (req, res) => {
  const body = req.body
  await service.create(body)

  res.json(body)
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body

  try {
    const seasson = await service.update(id, body)

    res.status(200).json(seasson)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await service.delete(id)

    res.status(200).json('Deleted')
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = { seassonsRouter: router }
