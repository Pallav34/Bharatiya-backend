const express = require('express');
const {createUser, checkUser, getProfile, logout} = require('../controller/User')
const {isAuthenticated} = require('../middlewares/auth')
const router = express.Router();

router.post('/signup',createUser)
.post('/login',checkUser)
.get('/me',isAuthenticated,getProfile)
.get('/logout',logout)

exports.router = router;