const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

authRouter.get("/user/auth/facebook", passport.authenticate("facebook"));

authRouter.get(
  "/user/auth/facebook/callback",
  passport.authenticate("facebook",
  {
    successRedirect : '/songslist',
    failureRedirect : '/'
  }
));

authRouter.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});




module.exports=authRouter;