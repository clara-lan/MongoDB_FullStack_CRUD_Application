const express = require('express');
const router = express.Router();

//import controllers here:
const homeCtrl = require('../controllers/home');
const songsCtrl = require('../controllers/my-songs');
const usersCtrl =  require('../controllers/users');
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/', homeCtrl.index);

// user auth
router.get('/login', usersCtrl.loginForm);
router.post('/login', usersCtrl.login);
router.get('/signup', usersCtrl.signupForm);
router.post('/signup', usersCtrl.signup);
router.get('/logout', usersCtrl.logout);

//songs 
router.get('/search/:id', songsCtrl.search );
router.get('/songslist', songsCtrl.index);
router.get('/newsong',songsCtrl.addForm);
router.post('/newsong',songsCtrl.create);
router.delete('/songslist', isLoggedIn, songsCtrl.deleteOne);
router.post('/songslist', isLoggedIn, songsCtrl.updateLike);



module.exports = router;