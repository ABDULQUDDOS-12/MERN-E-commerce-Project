const express = require('express')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json())
app.use(cookieParser())
//Route imports
const products = require('./routes/productRoutes')
const user = require('./routes/userRoute')
app.use('/api/v1',products)
app.use('/api/v1',user)
module.exports = app
//middleware for errors
app.use(errorMiddleware)
