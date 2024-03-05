const ErrorHandle = require("../Utils/erorrHandler");
const Product = require("../models/productModel");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../Utils/apifeatures");
const ErrorHandler = require("../Utils/erorrHandler");
//create Product --Admin
exports.createproduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(201).json({
    success: true,
    products,
    productCount
  });
});

//Update Products -- Admin
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
    // res.status(500),
    //   json({
    //     success: false,
    //     message: "Product not found",
    //   });
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(201).json({
      success: true,
      product,
      productCount,
    });
  }
});

//Delete Product
exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
    // res.status(500),
    //   json({
    //     success: false,
    //     message: "Product not found",
    //   });
  } else {
    await product.deleteOne();
    res.status(201).json({
      success: true,
      message: `Product with this id: ${req.params.id} is removed from database successfully`,
    });
  }
});
//Get product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandle("Product not found!", 404));
    // res.status(500),
    // json({
    //   success:false,
    //   message:"Product Not Found"
    // })
  } else {
    res.status(201).json({
      success: true,
      product,
    });
  }
});


//Create new reviews or update reviews

exports.createProductReviews = catchAsyncErrors(async(req,res,next)=>{
  const {rating,comment,productId} = req.body  
  const review = {
       user:req.user._id,
       name:req.user.name,
       rating:Number(rating),
       comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString() )
    if (isReviewed) {
      const userReview = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
      if (userReview) {
        userReview.rating = rating;
        userReview.comment = comment;
      }
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    
    //4,5,5,2=16/4=4
    let avg = 0;
    product.reviews.forEach((rev)=>{
      avg += rev.rating;
    })
    product.ratings =(avg / product.reviews.length);
    await product.save({validateBeforeSave:false})
    res.status(200).json({
      success:true,
    })
})

//Get Single Product Review
exports.getproductReviews =catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.id);
  if(!product)
  {
    return next(new ErrorHandler("Product not found",404))
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews,
  })
})

//Delete Single Review
exports.deleteReview =catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId);
  if(!product)
  {
    return next(new ErrorHandler("Product not found",404))
  }
  const reviews  = product.reviews.filter(
    (rev)=>rev._id.toString()!== req.query.id.toString()
  )
  let avg = 0;
    reviews.forEach((rev)=>{
      avg += rev.rating;
    })
    const ratings =(avg / reviews.length);
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId,{
     reviews,
     ratings,
     numOfReviews,
    },{
    new:true,
    runValidators:true,
    useFindAndModify:false,
    }),
  res.status(200).json({
    success:true,
  })
})




