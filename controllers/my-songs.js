const MySong = require('../models/my_songs');

module.exports ={
  index,
  create,
  addForm,
  deleteOne,
};

async function index(req, res, next) {
  try {
    const mySongs = await MySong.find({});
    console.log("loggedin user:", req.user);
    if(!req.user){
      res.redirect('/'); // add alert to remind login
    }
    else{
      res.render('songs/index', { mySongs });
    }
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next){
  // include user id with the song
 req.body.user = req.user;
try{
  await MySong.create(req.body);
  res.redirect('/songslist');
  }catch(err){
    next(err);
  }
}

function addForm(req, res){
  res.render('songs/new');
}


 async function deleteOne(req, res, next){
   try{
    await MySong.findByIdAndRemove({_id:req.body.id});
    res.redirect('/songslist');
    }
    catch(err){
      next(err);
    }
  }
