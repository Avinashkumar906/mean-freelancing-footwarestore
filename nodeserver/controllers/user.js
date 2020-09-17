const User = require('../models/user');
const bcrypt = require('bcryptjs')

module.exports = {
    getUser:async (req, res, next) => {
        try {        
            // fetching data from mongoDB
            const email = req.body.email.toLowerCase()
            const user = await User.find();
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getUsers:async (req, res, next) => {
        try {        
            // fetching data from mongoDB
            const users = await User.find({},{password:0});
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteUser:async (req, res, next) => {
        try {        
            const {_id} = req.query
            let user = await User.findByIdAndDelete(_id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    switchRole:async (req, res, next) => {
        try {        
            // fetching data from mongoDB
            const {_id} = req.query
            let user = await User.findById(_id);
            user.role = user.role === 'admin' ? 'visitor' : 'admin'; 
            await user.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    postSignUp:async (req, res, next) => {
        try {  
            let { email, name, password } = req.body
            email = email.toLowerCase()
            let userfound = await User.findOne({ email })
            if(userfound) 
                res.status(400).json({message:'Email in Use !'})
            else{
                let hash = bcrypt.hashSync(password,10)
                let user = new User({
                    name: name,
                    email: email,
                    password: hash,
                })
                await user.save();
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    postSignIn:async (req, res, next) => {
        try {  
            let { email, password } = req.body
            email = email.toLowerCase()
            let userfound = await User.findOne({ email })
            if(!userfound) 
                res.status(400).json({message:'User doesnot exist with email!'})
            else{
                let result = bcrypt.compareSync(password,userfound.password)
                if(result){
                    let obj = new Object({
                        name:userfound.name,
                        email:userfound.email,
                        role:userfound.role
                    })
                    res.status(200).json(obj)
                }else{
                    res.status(400).json({message:'Incorrect password!'})
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }            
}