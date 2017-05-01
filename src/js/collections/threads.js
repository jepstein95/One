var ThreadModel = require('models/thread');

module.exports = Backbone.Collection.extend({
  
  model: ThreadModel,

  url: '/threads',

  initialize: function() {
    this.fetch();
  }

});