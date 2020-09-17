const app = require('express')();
const fileUploader = require('express-fileupload');
const path = require('path')
const cors = require('cors')
const bodyparser = require('body-parser')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')

//Middlewares import
app.use(cors())
app.use(bodyparser.json());
app.use(fileUploader());

//Static assets
app.use('/static',require('express').static(path.join(__dirname,'static')))

//Routes middleware
app.use(userRoute)
app.use(productRoute)
app.use(orderRoute)

//Error handler
app.use('',(req,res)=>{
    res.status(500).json({message:"route not found!"})
})

module.exports = app;