const app = require('./App')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
dotenv.config({path:"Backend/config/config.env"})

//connecting to database
connectDatabase()
app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost: ${process.env.PORT}`)
})