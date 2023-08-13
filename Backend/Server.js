const app = require('./App')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')
//Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise Rejection`)
})
dotenv.config({path:"Backend/config/config.env"})

//connecting to database
connectDatabase()
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost: ${process.env.PORT}`)
})


//Unhandeled Promise Rejection

process.on("Unhandeled Rejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise`)
    server.close(()=>{
        process.exit(1);
    })
})