const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string();
const kind_of = Joi.string().valid("winter", "summer", "spring", "fall");
const description = Joi.string();
const src_image = Joi.string().dataUri();
const ammount = Joi.number().min(0);
const price = Joi.number().min(50);
const offert = Joi.number().min(0).max(100);
const location = Joi.string();
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  kind_of: kind_of.required(),
  ammount: ammount.required(),
  price: price.required(),
  isBlock: isBlock.required(),
  location: location.required(),
  description,
  src_image,
  offert,
});

const updateProductSchema = Joi.object({
  name,
  kind_of,
  ammount,
  price,
  isBlock,
  location,
  description,
  src_image,
  offert,
});

const createProductUserSchema = Joi.object({
  id,
  name: name.required(),
  kind_of: kind_of.required(),
  ammount: ammount.required(),
  price: price.required(),
  isBlock: isBlock.required(),
  location: location.required(),
  description,
  src_image,
  offert,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  createProductUserSchema,
  id
}
