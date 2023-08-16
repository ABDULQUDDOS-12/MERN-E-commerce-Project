const express = require('express')
const errorMiddleware = require('./middleware/error')
const app = express();
app.use(express.json())
//Route imports
const products = require('./routes/productRoutes')
const user = require('./routes/userRoute')
app.use('/api/v1',products)
app.use('/api/v1',user)
module.exports = app
//middleware for errors
app.use(errorMiddleware)
