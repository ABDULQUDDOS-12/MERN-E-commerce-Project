const Product = require("../models/productModel");
//create Product --Admin
exports.createproduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};
//Get All Products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(201).json({
    success: true,
    products,
  });
};

//Update Products -- Admin
exports.updateProducts = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500),
      json({
        success: false,
        message: "Product not found",
      });
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
};

//Delete Product
exports.deleteProducts = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500),
      json({
        success: false,
        message: "Product not found",
      });
  } else {
    await product.deleteOne();
    res.status(201).json({
      success: true,
      message:`Product with this id: ${req.params.id} is removed from database successfully`
    });
  }
};
