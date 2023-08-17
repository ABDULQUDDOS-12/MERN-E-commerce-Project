const ErrorHandler =   require('../Utils/erorrHandler');
const catchAsyncErrors = require("../middleware/catchAsyncError")
const User = require('../models/userModels')


// Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a simple id",
             url:"profilepicUrl"   
        }
    })
    const token = user.getJWTToken();
    res.status(201).json({
        success:true,
        token, 
        user,
    })
})

//Login a user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    //checking if user has given 
    if(!email || !password){
      return next(new ErrorHandler("Please Enter Email & Password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }  
    else{
        const token = user.getJWTToken();
        res.status(200).json({
            success:true,
            token, 
        })
    }
    
})