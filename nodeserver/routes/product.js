const express = require('express');
const productController = require('../controllers/product')

const router = express.Router();

router.post('/product', productController.addProduct)
router.patch('/product', productController.updateProduct)
router.delete('/product', productController.deleteProduct)
router.get('/product', productController.getProduct)

router.get('/products', productController.getProducts)

module.exports = router;