require('dotenv').config();
const express = require('express');
const cors = require("cors");

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const { indexRouter } = require('./router/')

const app = express()
const port = process.env.PORT || 3400
const whitelist = [
  "http://localhost:8080",
  "http://localhost:8083"
];
const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error("You are not authorized"));
    }
  }
};

// middlewares
app.use(express.json());
app.use(cors(options));

indexRouter(app)

// error middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on http://localhost:' + port)
});
