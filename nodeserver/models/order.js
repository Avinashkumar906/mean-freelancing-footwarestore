const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Mongodb schema for Order collection 
const orderSchema = new Schema({
    name:String,
    email:String,
    address:String,
    status:{type:String,default:'placed'},
    items:[
        {
            name:String,
            cost:Number,
            quantity:Number,
            company:String,
            description:String,
            image:String,
            selectedSize:String,
        }
    ]
})

module.exports = mongoose.model('order', orderSchema)