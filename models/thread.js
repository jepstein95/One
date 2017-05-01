var mongoose = require('mongoose');

/*
 *  Schema
 */

var ThreadModel = mongoose.Schema({
  name: String,
  description: String,
  log: [{date: Date, mark: Boolean}]
});

/*
 *  Validation
 */

ThreadModel.path('name').validate(function(name) {
  return name.length;
}, 'Name cannot be empty');

module.exports = ThreadModel;