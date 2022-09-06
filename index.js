require('dotenv').config()
const express = require('express')
const { indexRouter } = require('./router/')

const app = express()
const port = process.env.PORT || 3400

// middlewares
app.use(express.json())

indexRouter(app)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on http://localhost:' + port)
})
