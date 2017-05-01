var BaseView = require('views/base');

module.exports = BaseView.extend({

  el: '#menu',

  template: require('templates.js')['menu'],

  events: {
    'click a[rel=show-login]': 'show_login',
    'click a[rel=logout]': 'logout'
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.user = options.user;
    this.render();
  },

  render: function() {
    this.$el.html(this.template({user: this.user}));
  },

  show_login: function(e) {
    e.preventDefault();
    this.atc.trigger('show-login');
  },

  logout: function(e) {
    e.preventDefault();
    this.atc.trigger('logout');
  }
});