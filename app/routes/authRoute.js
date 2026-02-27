const express=require('express');
const AuthController = require('../controller/AuthController');
const authCheck = require('../middleware/auth');

const router=express.Router();


router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.get('/dashboard', authCheck,AuthController.dashboard)
router.get('/profile', authCheck, AuthController.profile)

module.exports=router