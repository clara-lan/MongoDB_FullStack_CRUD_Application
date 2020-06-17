const passport = require('passport');
const User = require('../models/user');
const FBStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("id", id);
  User.findById(id, function (err, user) {
    done(err, user);
  })
});

passport.use(
  new FBStrategy({
    clientID:process.env.FB_ID,
    clientSecret:process.env.FB_SECRET,
    callbackURL:process.env.FB_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ "facebookID":profile.id });
    if(existingUser){
      return done(null, existingUser);
    }else{
    const user = await new User({ "facebookID":profile.id }).save();
    return done(null, user);
  }}
));


