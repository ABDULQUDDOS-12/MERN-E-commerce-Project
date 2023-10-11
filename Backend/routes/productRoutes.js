const express = require('express');
const { getAllProducts,createproduct,updateProducts,deleteProducts,getProductDetails,createProductReviews } = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
const router = express.Router();
router.route('/products').get( getAllProducts)
router.route('/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),createproduct)
router.route('/products/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProducts).get(getProductDetails).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducts)
router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser,createProductReviews)    
module.exports = router 