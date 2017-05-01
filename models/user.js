var mongoose = require('mongoose');
var crypto = require('crypto');

/*
 *  Schema
 */

var UserModel = mongoose.Schema({
  email: String,
  username: String,
  hash: String,
  salt: String
});

/*
 *  Virtuals
 */

UserModel
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.make_salt();
    this.hash = this.encrypt(password);
  })
  .get(function() {
    return this._password;
  });

/*
 *  Validation
 */

UserModel.path('email').validate(function(email) {
  return email.length;
}, 'Email cannot be empty');

UserModel.path('username').validate(function(username) {
  return username.length;
}, 'Username cannot be empty');

UserModel.path('username').validate(function(username, fn) {
  var Users = mongoose.model('users');

  if (this.isNew) {
    Users.find({username: username}).exec(function(err, users) {
      fn(!err && users.length === 0);
    });
  } else {
    fn(true);
  }
}, 'Username already exists');

UserModel.path('hash').validate(function(hash) {
  return hash.length && this._password.length;
}, 'Password cannot be empty');

/*
 *  Pre-save hook
 */

UserModel.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!this.password || !this.password.length) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/*
 *  Methods
 */

UserModel.methods = {
  authenticate: function(password) {
    return this.encrypt(password) === this.hash;
  },

  make_salt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  encrypt: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch(err) {
      return '';
    }
  }
}

module.exports = mongoose.model('users', UserModel);