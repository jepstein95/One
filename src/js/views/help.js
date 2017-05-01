var BaseView = require('views/base');

module.exports = BaseView.extend({

  el: '#help',

  template: require('templates.js')['help'],

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  },
});