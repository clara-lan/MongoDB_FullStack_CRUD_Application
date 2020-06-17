const express = require('express');
const router = express.Router();

//import controllers here:
const homeCtrl = require('./controllers/home');
const songsCtrl = require('./controllers/my-songs');


router.get('/', homeCtrl.index);


//songs 
router.get('/songslist', songsCtrl.index);
router.get('/newsong',songsCtrl.addForm);
router.post('/newsong',songsCtrl.create);



module.exports = router;