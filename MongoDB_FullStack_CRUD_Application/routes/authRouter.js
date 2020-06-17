const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

authRouter.get("/user/auth/facebook", passport.authenticate(
  "facebook",
  { scope: ['profile','email']}));

authRouter.get(
  "/user/auth/facebook/callback",
  passport.authenticate("facebook",
  {
    successRedirect : '/songslist',
    failureRedirect : '/'
  }
));




module.exports=authRouter;