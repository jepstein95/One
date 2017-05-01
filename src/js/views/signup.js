var BaseView = require('views/base');

module.exports = BaseView.extend({

  el: '#modal',

  template: require('templates.js')['signup'],

  events: {
    'click .button.submit': 'signup'
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    $('#signup-form').form({
      on: 'blur',
      inline: true,
      fields: {
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Required field'
            },
            {
              type: 'email',
              prompt: 'Please enter a valid email'
            }
          ]
        },
        username: {
          identifier: 'username',
          rules: [
            {
              type: 'empty',
              prompt: 'Required field'
            },
            {
              type: 'minLength[4]',
              prompt: 'Min. 4 characters'
            },
            {
              type: 'maxLength[16]',
              prompt: 'Max. 16 characters'
            },
            {
              type: 'regExp[/^[A-Za-z0-9_-]*$/]',
              prompt: 'Alphanumeric only'
            }
          ]
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Required field'
            },
            {
              type: 'minLength[8]',
              prompt: 'Min. 8 characters'
            },
            {
              type: 'maxLength[16]',
              prompt: 'Max. 16 characters'
            },
            {
              type: 'regExp[/^[A-Za-z0-9_-]*$/]',
              prompt: 'Alphanumeric only'
            }
          ]
        },
        confirm: {
          identifier: 'confirm',
          rules: [
            {
              type: 'empty',
              prompt: 'Required field'
            },
            {
              type: 'match[password]',
              prompt: 'Passwords must match'
            }
          ]
        },
      }
    });
  },

  signup: function() {
    var form = $('#signup-form');
    if (form.form('is valid'))
    {
      $.ajax({
        type: form.attr('method'),
        url:  form.attr('action'),
        data: form.find('input').not('[name=confirm]').serialize(),
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
  }
  
});