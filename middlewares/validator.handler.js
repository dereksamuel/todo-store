/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data);

    if (error) {
      // throw boom.badData(error);
      next(boom.badData(error));
      return;
    }

    next();
  };
}

module.exports = { validatorHandler }
