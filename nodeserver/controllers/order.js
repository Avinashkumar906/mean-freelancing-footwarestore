const Order = require('../models/order')
const Product = require('../models/product')
const order = require('../models/order')

module.exports = {
    addOrder:async (req, res, next) => {
        try { 
            let order = new Order(req.body)
            order = await order.save()
            order.items.forEach(async (element) => {
                let product = await Product.findById(element._id)
                product.quantity = product.quantity - element.quantity;
                await product.save()
            });
            res.json(order)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getOrders:async (req, res, next) => {
        try { 
            let orders = await Order.find()
            orders.reverse()
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getOrdersByMail:async (req, res, next) => {
        try { 
            const {email} = req.query
            let orders = await Order.find({email})
            orders.reverse()
            res.json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getOrderById:async (req, res, next) => {
        try { 
            const {_id} = req.query
            let order = await Order.findById(_id)
            res.json(order)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteOrder:async (req, res, next) => {
        try { 
            const {_id} = req.query
            let order = await Order.findByIdAndDelete(_id)
            res.json(order)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    completeOrder:async (req, res, next) => {
        try { 
            const {_id} = req.query
            let order = await Order.findById(_id)
            order.status = 'completed';
            await order.save()
            res.json(order)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}