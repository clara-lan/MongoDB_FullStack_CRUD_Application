const express = require('express');
const router = express.Router();

//import controllers here:
const homeCtrl = require('./controllers/home');
const isLoggedIn = require('./middleware/isLoggedIn');

router.get('/', homeCtrl.index);






module.exports = router;