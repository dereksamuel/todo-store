const express = require('express')
const { Users } = require('../services/users.services')

const router = express.Router()
const service = new Users()

router.get('/', async (req, res) => {
  const users = await service.getAll()

  res.json(users)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await service.getOne(id)

  if (!user) {
    res.status(404).send('Not found')
    return
  }

  res.json(user)
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
    const user = await service.update(id, body)

    res.status(200).json(user)
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

module.exports = { usersRouter: router }
