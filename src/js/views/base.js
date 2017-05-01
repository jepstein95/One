module.exports = Backbone.View.extend({
  
  initialize: function(options) {
    if (options.atc) this.atc = options.atc;
    _.each(this.atc_events, function(fn, key) {
      this.listenTo(this.atc, key, this[fn]);
    }.bind(this));
  },

  remove: function() {
    this.$el.empty().off();
    this.stopListening();
  }
});