require('dotenv').config()
const express = require('express')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const { indexRouter } = require('./router/')

const app = express()
const port = process.env.PORT || 3400

// middlewares
app.use(express.json())

indexRouter(app)

// error middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on http://localhost:' + port)
})
