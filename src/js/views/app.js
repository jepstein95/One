var BaseView = require('views/base');
var MenuView = require('views/menu');
var SignupView = require('views/signup');
var LoginView = require('views/login');
var EditView = require('views/edit');

module.exports = BaseView.extend({

  el: 'body',

  template: require('templates.js')['app'],
  alert: require('templates.js')['alert'],

  atc:  _.extend({}, Backbone.Events),

  atc_events: {
    'page-left'   : 'page_left',
    'page-right'  : 'page_right',
    'show-signup' : 'show_signup',
    'show-login'  : 'show_login',
    'show-edit'   : 'show_edit',
    'show-alert'  : 'show_alert',
    'hide-modal'  : 'hide_modal',
    'logout'      : 'logout'
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.pages = options.pages;
    this.page = options.page;
    this.user = options.user;
    var ids = _.map(this.pages, function(page) { return page.id; });
    this.render(ids);
    this.pages = _.map(this.pages, function(page, i) {
      page.view = new page.view({atc: this.atc});
      return page;
    }, this);
    $('body').on('swiperight', this.page_left.bind(this));
    $('body').on('swipeleft', this.page_right.bind(this));
  },

  render: function(ids) {
    this.$el.html(this.template({ids: ids, page: this.page}));
    this.menu = new MenuView({atc: this.atc, user: this.user});
    $('#modal').modal({
      allowMultiple: true,
      onHidden: this.modal_hidden.bind(this)
    });
    $('#modal-alert').modal({
      allowMultiple: true,
      closable: false,
      onApprove: function() {
        this.atc.trigger('approve');
      }.bind(this),
      onDeny: function() {
        this.atc.trigger('deny');
      }.bind(this)
    });
  },

  page_left: function() {
    if (this.page > 0)
    {
      this.page--;
      this.do_page();
    }
  },

  page_right: function() {
    if (this.page < this.pages.length - 1)
    {
      this.page++;
      this.do_page();
    }
  },

  do_page: function() {
    var page = this.page;
    $('.page').each(function(i) {
      if (i == page) $(this).removeClass('page-right').removeClass('page-left');
      if (i <  page) $(this).addClass('page-left');
      if (i >  page) $(this).addClass('page-right');
    });
  },

  show_signup: function() {
    this.modal = new SignupView({atc: this.atc});
    $('#modal').modal('show');
  },

  show_login: function() {
    this.modal = new LoginView({atc: this.atc});
    $('#modal').modal('show');
  },

  show_edit: function(model) {
    this.modal = new EditView({atc: this.atc, model: model});
    $('#modal').modal('show');
  },

  show_alert: function(alert) {
    $('#modal-alert').html(this.alert(alert));
    $('#modal-alert').modal('show');
  },

  hide_modal: function() {
    $('#modal').modal('hide');
  },

  modal_hidden: function() {
    this.modal.remove();
  },

  logout: function() {
    $.ajax({
      type: 'post',
      url:  '/users/logout',
      complete: function(request, status) {
        if (request.readyState == 4 && request.status == 200) {
          var data = JSON.parse(request.responseText);
          window.location.href = data.redirect;
        }
      }
    });
  }

});