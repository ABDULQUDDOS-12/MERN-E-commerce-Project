const express = require('express');
const { getAllProducts,createproduct,updateProducts,deleteProducts,getProductDetails } = require('../controllers/productController');
const router = express.Router();
router.route('/products').get(getAllProducts)
router.route('/products/new').post(createproduct)
router.route('/products/:id').put(updateProducts)
router.route('/products/:id').delete(deleteProducts)
router.route('/products/:id').get(getProductDetails)
module.exports = router