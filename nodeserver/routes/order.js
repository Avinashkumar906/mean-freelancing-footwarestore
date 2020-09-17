const express = require('express');
const orderController = require('../controllers/order');

const router = express.Router();

router.get('/orders',orderController.getOrders)

router.get('/ordersbymail',orderController.getOrdersByMail)

router.get('/order',orderController.getOrderById)
router.post('/order',orderController.addOrder)
router.delete('/order',orderController.deleteOrder)
router.patch('/order',orderController.completeOrder)

module.exports = router;