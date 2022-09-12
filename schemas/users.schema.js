const Joi = require('joi')
const { id: productId } = require('./products.schema')

const id = Joi.string().uuid()
const fullname = Joi.string()
const email = Joi.string().email()
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
const products = Joi.array().items(productId)

const createUserSchema = Joi.object({
  fullname: fullname.required(),
  email: email.required(),
  password: password.required(),
  products
})

const updateUserSchema = Joi.object({
  fullname,
  email,
  password,
  products
})

const getUserSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
}
