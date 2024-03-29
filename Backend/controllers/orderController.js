const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../Utils/erorrHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalprice,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalprice,
    paidAt:Date.now(),
    user:req.user._id,
  })
  res.status(201).json({
   success:true,
   order,
})
});



//Search user  Order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
   const order = await Order.findById(req.params.id).populate("user","name email");
   if(!order){
    return next(new ErrorHandler("Order not found with this id",404));
   }
   res.status(200).json({
    success:true,
    order,
   })
})

//Get logged in user  Order
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.find({user: req.user._id});
  if(!order){
   return next(new ErrorHandler("Order not found with this id",404));
  }
  res.status(200).json({
   success:true,
   order,
  })
})

//Get all orders  --admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
  const orders = await Order.find();
  let totalAmount  = 0;
  orders.forEach((order)=>{
    totalAmount += order.totalPrice;
  })
  if(!orders){
   return next(new ErrorHandler("Order not found with this id",404));
  }
  res.status(200).json({
   success:true,
   orders,
  })
})

//Get all orders  --admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
  const orders = await Order.find();
  let totalAmount  = 0;
  orders.forEach((order)=>{
    totalAmount += order.totalPrice;
  })
  if(!orders){
   return next(new ErrorHandler("Order not found with this id",404));
  }
  res.status(200).json({
   success:true,
   orders,
  })
})

// Update order status --admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this product", 400));
  }

  try {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    if (error.message === "Out of stock") {
      return next(new ErrorHandler("Out of stock", 400));
    } else {
      return next(error);
    }
  }
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (product) {
    if (product.Stock - quantity < 0) {
      throw new ErrorHandler("Out of stock", 400);
    }

    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
  }
}


//Delete Orders  --admin
exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);
  await order.deleteOne()
  if(!order){
    return next(new ErrorHandler("Order not found with this id",404));
   }

  res.status(200).json({
   success:true,
  })
})
