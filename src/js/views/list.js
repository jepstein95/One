var BaseView = require('views/base');
var ThreadsCollection = require('collections/threads');

module.exports = BaseView.extend({

  el: '#list',

  template: require('templates.js')['list'],

  events: {
    'click a[rel=learn-more]': 'page_left',
    'click .add-button .button': 'show_create',
    'click a[rel^=edit]': 'show_edit',
    'click a[rel^=delete]': 'delete',
    'click i[rel^=mark]': 'mark'
  },

  atc_events: {
    'create-thread': 'create',
    'edit-thread'  : 'edit'
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.collection = new ThreadsCollection();
    this.collection.on('sync', this.update, this);
    this.render(true);
  },

  update: function() {
    var threads = _.map(this.collection.toJSON(), function(thread) {
      var last = thread.log[thread.log.length - 1];
      var date = new Date(last.date);
      var today = new Date();
      while (date.toDateString() !== today.toDateString()) {
        date.setDate(date.getDate() + 1);
        thread.log.push({date: date.toString(), mark: false});
      }
      return thread;
    });
    console.log(threads);
    this.collection.set(threads);
    this.sync();
  },

  render: function(loading) {
    var threads = this.parse_threads();
    this.$el.html(this.template({threads: threads, loading: loading}));
  },

  parse_threads: function() {
    return _.map(this.collection.toJSON(), function(thread) {
      var best_score = 0;
      var curr_score = 0;
      _.each(thread.log, function(obj) {
        if (obj.mark) {
          curr_score++;
          if (curr_score > best_score)
            best_score = curr_score;
        } else {
          curr_score--;
          if (curr_score < 0)
            curr_score = 0;
        }
      });
      var best_streak = 0;
      var curr_streak = 0;
      _.each(thread.log, function(obj) {
        if (obj.mark) {
          curr_streak++;
          if (curr_streak > best_streak)
            best_streak = curr_streak;
        } else {
          curr_streak = 0;
        }
      });
      thread.curr_score = curr_score;
      thread.best_score = best_score;
      thread.best_streak = best_streak;
      thread.curr_streak = curr_streak;
      thread.mark = thread.log[thread.log.length - 1].mark;
      return thread;
    });
  },

  page_left: function(e) {
    e.preventDefault();
    this.atc.trigger('page-left');
  },

  show_create: function() {
    this.atc.trigger('show-edit');
  },

  create: function(thread) {
    this.collection.add(thread);
    this.sync();
  },

  show_edit: function(e) {
    e.preventDefault();
    var id = $(e.target).attr('rel').split('-')[1];
    var model = this.collection.findWhere({_id: id});
    this.atc.trigger('show-edit', model.toJSON());
  },

  edit: function(id, thread) {
    var model = this.collection.findWhere({_id: id});
    model.set(thread);
    this.sync();
  },

  delete: function(e) {
    e.preventDefault();
    var id = $(e.target).attr('rel').split('-')[1];
    this.atc.trigger('show-alert', {
      header: 'Delete',
      body: 'Are you sure you want to delete this Thread? Action cannot be undone.'
    });
    this.listenToOnce(this.atc, 'approve', function() {
      var model = this.collection.findWhere({_id: id});
      this.collection.remove(model);
      this.sync();
      this.stopListening(this.atc, 'deny');
    });
    this.listenToOnce(this.atc, 'deny', function() {
      this.stopListening(this.atc, 'approve');
    });
  },

  mark: function(e) {
    var id = $(e.target).attr('rel').split('-')[1];
    var model = this.collection.findWhere({_id: id});
    var json = model.toJSON();
    var last = json.log[json.log.length - 1];
    json.log[json.log.length - 1].mark = last.mark ? false : true;
    model.set(json);
    this.sync();
  },

  sync: function() {
    Backbone.sync('update', this.collection, {
      success: function(data) {
        this.collection.set(data);
        this.render();
        this.atc.trigger('update-graph', data);
      }.bind(this)
    });
  }

});