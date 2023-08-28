const express = require('express');
const { getAllProducts,createproduct,updateProducts,deleteProducts,getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');
const router = express.Router();
router.route('/products').get( getAllProducts)
router.route('/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),createproduct)
router.route('/products/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProducts).get(getProductDetails).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProducts)
module.exports = router