const express = require('express')
const { Seassons } = require('../services/seassons.services')

const router = express.Router()
const service = new Seassons()

router.get('/', async (req, res) => {
  const seassons = await service.getAll()
  res.status(200).json(seassons)
})

router.get('/:seassonId', async (req, res, next) => {
  const { seassonId } = req.params
  const { productId } = req.query

  try {
    const seasson = await service.getOne(seassonId, +productId)

    res.status(200).send(seasson)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res) => {
  const body = req.body
  await service.create(body)

  res.json(body)
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  const body = req.body

  try {
    const seasson = await service.update(id, body)

    res.status(200).json(seasson)
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

module.exports = { seassonsRouter: router }
