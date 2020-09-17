const express = require('express');
const userController = require('../controllers/user')

const router = express.Router();

router.post('/signin',userController.postSignIn)
router.post('/signup',userController.postSignUp)

router.get('/users',userController.getUsers)

router.delete('/user',userController.deleteUser)
router.get('/switchrole',userController.switchRole)

module.exports = router;