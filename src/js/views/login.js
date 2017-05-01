var BaseView = require('views/base');

module.exports = BaseView.extend({

  el: '#modal',

  template: require('templates.js')['login'],

  events: {
    'click .button.submit': 'login'
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  },

  login: function() {
    var form = $('#login-form');
    $.ajax({
      type: form.attr('method'),
      url:  form.attr('action'),
      data: form.find('input').serialize(),
      complete: function(request, status) {
        if (request.readyState == 4 && request.status == 200) {
          var data = JSON.parse(request.responseText);
          window.location.href = data.redirect;
        }
      },
      error: function(request, status, error) {
        form.form('add errors', [request.responseText]);
      }
    });
  }
  
});