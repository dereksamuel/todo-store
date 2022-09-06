const express = require('express')
const { Users } = require('../services/users.services')

const router = express.Router()
const service = new Users()

router.get('/', (req, res) => {
  const users = service.getAll()

  res.json(users)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = service.getOne(id)

  if (!user) {
    res.status(404).send('Not found')
    return
  }

  res.json(user)
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

module.exports = { usersRouter: router }
