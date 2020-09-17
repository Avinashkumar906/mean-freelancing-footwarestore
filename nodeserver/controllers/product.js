const Product = require('../models/product')
const fs = require('fs')
const path = require('path')

module.exports = {
    addProduct:async (req, res, next) => {
        try {  
            const file = req.files && req.files.file ? req.files.file : '';
            let product = JSON.parse(req.body.body)
            let url = `/static/${Date.now().toString()}_${file.name}`
            file.mv(`.${url}`,async (result,err)=>{
                if(!err){
                    product.image = url
                    product = new Product(product)
                    await product.save()
                    res.status(201).json(product)
                }
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateProduct:async (req, res, next) => {
        try {
            let {_id} = req.query;
            let update = req.body;
            await Product.findByIdAndUpdate(_id,update,{useFindAndModify:false})
            let product = await Product.findById(_id)
            res.status(201).json(product)    
        } catch (error) {
            res.status(500).json(error) 
        }
        
    },
    deleteProduct:async (req, res, next) => {
        try {
            let {_id} = req.query;
            let product = await Product.findByIdAndDelete(_id)
            if(fs.existsSync(`.${product.url}`) && product){
                fs.unlinkSync(`.${product.url}`);
            }
            res.status(201).json(product)    
        } catch (error) {
            res.status(500).json(error) 
        }
    },
    getProducts:async (req, res, next) => {
        try {  
            let products = await Product.find()
            products.reverse()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json(error)
        }
    },      
    getProduct:async (req, res, next) => {
        try { 
            const {_id} = req.query 
            let product = await Product.findById(_id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }          
}