const express = require('express');
const router = express.Router();

//import controllers here:
const homeCtrl = require('./controllers/home');
const usersCtrl = require('./controllers/users');

const isLoggedIn = require('./middleware/isLoggedIn');

router.get('/', homeCtrl.index);

// user auth
router.get('/login', usersCtrl.loginForm); //get login Form
router.post('/login', usersCtrl.login);// post through login func
router.get('/signup', usersCtrl.signupForm);
router.post('/signup', usersCtrl.signup);
router.get('/logout', usersCtrl.logout);




module.exports = router;