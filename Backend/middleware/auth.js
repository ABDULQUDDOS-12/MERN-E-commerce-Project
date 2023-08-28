const ErrorHandler = require("../Utils/erorrHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt =  require("jsonwebtoken")
const User =  require('../models/userModels')
exports.isAuthenticatedUser  =  catchAsyncError(async (req,res,next)=>{
    const {token} = req.cookies;
     console.log(token)
     if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
     } 
     else{
        const decodeData = jwt.verify(token,process.env.JWT_SECRET)
        req.user =  await User.findById(decodeData.id)
        next(); 
    }
})

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
        return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)
    )   
    }
        next();
    }
    
} 