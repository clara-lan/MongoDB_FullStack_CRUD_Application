const MySong = require('../models/my_songs');

module.exports ={
  index,
  create,
  addForm,
};

async function index(req, res, next) {
  try {
    const mySongs = await MySong.find({});
    res.render('songs/index', { mySongs });
  } catch (err) {
    next(err);
  }
}

function create(req, res, next){
 const song = new MySong(req.body);
 song.save(function(err){
  if(err){
    console.log(err);
    return res.redirect('/songslist');
  }
  res.redirect('/songslist');
 });
}

function addForm(req, res){
  res.render('songs/new');
}