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
    res.status(201).json({
        success:true,
        user,

    })
})