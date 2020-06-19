const express = require('express');
const router = express.Router();

//import controllers here:
const homeCtrl = require('../controllers/home');
const songsCtrl = require('../controllers/my-songs');
const isLoggedIn = require('../middleware/isLoggedin');

router.get('/', homeCtrl.index);


//songs 
router.get('/songslist', songsCtrl.index);
router.get('/newsong',songsCtrl.addForm);
router.post('/newsong',songsCtrl.create);
router.delete('/songslist', isLoggedIn, songsCtrl.deleteOne);
router.post('/songslist', isLoggedIn, songsCtrl.updateLike);


module.exports = router;