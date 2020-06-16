const User = require('../models/user');

module.exports ={
  login
}

function login(req, res, next){ 
  User.findOne({ email: req.body.email })
    .select('+password')
    .exec(function (err, user) {
      if (err) {
        // could change to redirect back to form with error message
        return next(err);
      }
      if (!user) {
        // could change to redirect back to form with error message
        return next(Error('Invalid Credentials'));
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          req.logIn(user, function (err) {
            if (err) return next(err);
            return res.redirect('/');
          });
        }
        // could change to redirect back to form with error message
        return next(Error('Invalid Credentials'));
      });
    });
}
