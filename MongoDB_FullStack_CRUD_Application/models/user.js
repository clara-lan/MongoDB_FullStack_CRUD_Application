const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  facebookID:String,
 }, {
  timestamps:true,
  runSettersOnQuery:true// in order to exec "findByIdAndRemove".ect, this prop should be true
});

userSchema.set('toJSON',{
  transform: function(doc,ret){
    //remove password when transform doc to json
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();// if no change on password, continue
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

// mongoose instance method, used to compare passwords
userSchema.methods.comparePassword = function (tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);