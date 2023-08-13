const express = require('express');
const { getAllProducts,createproduct,updateProducts,deleteProducts } = require('../controllers/productController');
const router = express.Router();
router.route('/products').get(getAllProducts)
router.route('/products/new').post(createproduct)
router.route('/products/:id').put(updateProducts)
router.route('/products/:id').delete(deleteProducts)
module.exports = router