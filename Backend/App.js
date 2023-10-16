const express = require('express')
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json())
app.use(cookieParser())
//Route imports
const products = require('./routes/productRoutes')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
app.use('/api/v1',products)
app.use('/api/v1',user)
app.use('/api/v1',order)
module.exports = app


//middleware for errors
app.use(errorMiddleware)
