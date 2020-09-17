const mongoose = require('mongoose');
const User = require('./models/user')
const app = require('./app')
const env = require('dotenv')
const bcrypt = require('bcryptjs')

//Setting enviroment variables comment below for server deployment
if(!process.env.PORT || !process.env.MONGO_URL){
    env.config();
}

//Mongodb setup
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(
        ()=>{
            return User.findOne({email:process.env.ADMIN_EMAIL})
        }
    )
    .then(
        (user)=>{
            if(!user){
                user = new User({
                    name : process.env.ADMIN_NAME,
                    email: process.env.ADMIN_EMAIL.toLowerCase(),
                    password:bcrypt.hashSync(process.env.ADMIN_PSWD,10),
                    role:process.env.ADMIN_ROLE
                })
                user.save((res)=>console.log(`Admin Registered!`))
            } else {
                console.log(`Admin exist!`)
            }
            console.log(`Mongodb connected ! <br/>`);
        }
    )
    .catch(
        (e)=>console.log(e)
    )

//Starting server 
app.listen(process.env.PORT,()=>console.log(`Server running at port ${process.env.PORT}<br/>`));