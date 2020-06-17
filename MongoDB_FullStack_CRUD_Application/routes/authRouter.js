const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

authRouter.get("/user/auth/facebook", passport.authenticate("facebook"));

authRouter.get(
  "/user/auth/facebook/callback",
  passport.authenticate("facebook",{
    successRedirect:"/songslist",
    faliureRedirect:"/"
  })
);

// authRouter.get("/fail",(req, res)=>{
//   res.send("Failed Attempt");
// });

// authRouter.get("/", (req,res)=>{
//   res.redirect("/songslist");
// });

module.exports=authRouter;