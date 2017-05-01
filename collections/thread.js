var mongoose = require('mongoose');
var ThreadModel = require('../models/thread');

/*
 *  Schema
 */

var ThreadCollection = mongoose.Schema({
  username: String,
  threads: [ThreadModel]
});

/*
 *  Validation
 */

ThreadCollection.path('username').validate(function(username, fn) {
  var Threads = mongoose.model('threads');

  if (this.isNew) {
    Threads.find({username: username}).exec(function(err, threads) {
      fn(!err && threads.length === 0);
    });
  } else {
    fn(true);
  }
}, 'Collection already exists');

ThreadCollection.path('username').validate(function(username, fn) {
  var Users = mongoose.model('users');

  if (this.isNew) {
    Users.find({username: username}).exec(function(err, users) {
      fn(!err && users.length === 1);
    });
  } else {
    fn(true);
  }
}, 'Username must exist');

module.exports = mongoose.model('threads', ThreadCollection);