const express = require('express')
const { validatorHandler } = require('../middlewares/validator.handler')
const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/users.schema')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await global.usersService.getAll()

  res.json(users)
})

router.get('/:id',
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
  const { id } = req.params

  try {
    const user = await global.usersService.getOne(id)
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createUserSchema, "body"),
  async (req, res) => {
  const body = req.body
  await global.usersService.create(body)

  res.json(body)
})

router.patch('/:id',
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
  const { id } = req.params
  const body = req.body

  try {
    const user = await global.usersService.update(id, body)

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    await global.usersService.delete(id)

    res.status(200).json('Deleted')
  } catch (error) {
    next(error)
  }
})

module.exports = { usersRouter: router }
