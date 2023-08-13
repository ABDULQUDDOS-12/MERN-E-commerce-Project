const ErrorHandle = require("../Utils/erorrHandler");
const Product = require("../models/productModel");
const catchAsyncErrors = require('../middleware/catchAsyncError'); 
const ApiFeatures = require("../Utils/apifeatures");
//create Product --Admin
exports.createproduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(),req.query).search()
  const products = await apiFeature.query; 
  res.status(201).json({
    success: true,
    products,
  });
});

//Update Products -- Admin
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
     return next(new ErrorHandle("Product not found",404))
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
    });
  }
});

//Delete Product
exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandle("Product not found",404))
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
