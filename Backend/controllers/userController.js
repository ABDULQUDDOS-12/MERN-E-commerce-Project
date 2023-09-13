const ErrorHandler = require("../Utils/erorrHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const sendToken = require("../routes/jwtToken");
const sendEmail = require('../Utils/sendEmail')
const crypto = require('crypto')
// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a simple id",
      url: "profilepicUrl",
    },
  });
  sendToken(user, 201, res);
});

//Login a user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  } else {
    sendToken(user, 200, res);
  }
});

//Logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  //Get Password Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you haven't requested this email then, please ignore it`  
  try {
    await sendEmail({
     email:user.email,
     subject:`Ecommerce Password Recovery`,
     message, 
    })
    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfuly`
    })
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({validateBeforeSave:false});
    return next(new ErrorHandler(error.message,500))

  }


});


exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
  
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    const user = await User.findOne({
     resetPasswordToken, 
      resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user){
      return next(new ErrorHandler("Reset Password is invalid or has been expired",400));
    }
    if(req.body.password!== req.body.confirmPassword){
      return next(new ErrorHandler("this password isnot matches",400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res)
  });


  //Get User Detail
  exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success:true,
      user,
    })
  })

  //Update User Password
  exports.updatePassword= catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");
     const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
      return next(new ErrorHandler("Old Password is incorrect",401))
    }
    if(req.body.newPassword!==req.body.confirmPassword){
      return next(new ErrorHandler("Password doesnot match",401))
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res)
    
  })


  //Update User Profile
  exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{ 
    const newUserData ={
         name:req.body.name,
         email:req.body.email,
    }
  // We will add cloudinary later
    const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      userFindAndModify:false,
    })
    res.status(200).json({
      success:true,
    })
  })              

  //Get All Users(admin)
  exports.getAllUsers   = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.find();
    res.status(200).json({
      success:true,
      user,
    })
 })




  //Get single user details (admin)
  exports.getSingleUser   = catchAsyncErrors(async(req,res,next)=>{
     const user = await User.findById(req.params.id);
     if(!user){
      return  next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
     }
     res.status(200).json({
       success:true,
       user,
     })
  })


   //Update User Role  -- Admin
   exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{ 
    const newUserData ={
         name:req.body.name,
         email:req.body.email,
         role:req.body.role
    }
  // We will add cloudinary later
    const user =await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      userFindAndModify:false,
    })
    res.status(200).json({
      success:true,
    })
  })  



   //Delete User -- Admin
   exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }
  
    // Use 'user.remove()' to delete the specific user
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message:"User Deleted Successfully"
    });
  });
  
  
  
  
  
  