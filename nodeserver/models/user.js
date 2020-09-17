const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Mongodb schema for user collection 
const userSchema = new Schema({
    email:String,
    password:String,
    name:String,
    role:{type:String,default:'visitor'},
})

module.exports = mongoose.model('user', userSchema)