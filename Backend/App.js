const express = require('express')
const errorMiddleware = require('./middleware/error')
const app = express();
app.use(express.json())
//Route imports
const products = require('./routes/productRoutes')
app.use('/api/v1',products)

module.exports = app
//middleware for errors
app.use(errorMiddleware)
