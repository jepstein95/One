var BaseView = require('views/base');

module.exports = BaseView.extend({

  el: '#modal',

  template: require('templates.js')['edit'],

  events: {
    'click .create-button': 'create',
    'click .edit-button'  : 'edit'
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.model = options.model;
    this.render();
  },

  render: function() {
    this.$el.html(this.template({model: this.model}));
    $('#edit-form').form({
      on: 'blur',
      inline: true,
      fields: {
        name: {
          identifier: 'name',
          rules: [
            {
              type: 'empty',
              prompt: 'Required field'
            },
            {
              type: 'maxLength[25]',
              prompt: 'Max. 25 characters'
            }
          ]
        }
      }
    });
  },

  create: function() {
    var form = $('#edit-form');
    var data = form.find('input, textarea').serializeArray();
    var json = {};
    _.each(data, function(obj) {
      json[obj.name] = obj.value;
    });
    json.log = [{date: new Date(new Date().toDateString()), mark: false}];
    this.atc.trigger('create-thread', json);
  },

  edit: function() {
    var form = $('#edit-form');
    var data = form.find('input, textarea').serializeArray();
    var json = {};
    _.each(data, function(obj) {
      json[obj.name] = obj.value;
    });
    this.atc.trigger('edit-thread', this.model._id, json);
  }

});