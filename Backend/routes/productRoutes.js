const express = require('express');
const { getAllProducts,createproduct,updateProducts,deleteProducts,getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();
router.route('/products').get(isAuthenticatedUser, getAllProducts)
router.route('/products/new').post(createproduct)
router.route('/products/:id').put(updateProducts).get(getProductDetails).delete(deleteProducts)
module.exports = router