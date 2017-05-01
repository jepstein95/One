var BaseView = require('views/base');

module.exports = BaseView.extend({

  el: '#home',

  template: require('templates.js')['home'],

  events: {
    'click a[rel=learn-more]': 'page_left',
    'click .button[rel=show-signup]': 'show_signup',
    'click .button[rel=show-login]': 'show_login'
  },

  quotes: [
    {
      quote: "I pick things up and I put them down.",
      source: "The Governator"
    },
    {
      quote: "The greats weren't great because at birth they could paint. They greats are great 'cause they paint a lot.",
      source: "Macklemore"
    },
    {
      quote: "Got a wig for his wig, got a brain for his heart. He'll kick you apart. He'll kick you apart. Ooh!",
      source: "Brad Neely"
    },
    {
      quote: "The fight is won or lost far away from witnesses, behind the lines, in the gym, and out there on the road, long before I dance under those lights.",
      source: "Muhammad Ali"
    },
    {
      quote: "You want me to do something… tell me I can’t do it.",
      source: "Maya Angelou"
    },
    {
      quote: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
      source: "Bruce Lee"
    },
    {
      quote: "This is our f*cking life here.",
      source: "Jimmy Mickle"
    },
    {
      quote: "Do not cede victory in any way. If your man is a good deep cutter, recognize thats probably what he wants to do and plan accordingly. But he is certainly not a better deep cutter than you are a deep defender. Simply know that you are better. Some may call it cockiness, I call it confidence.",
      source: "Josh Zipperstein"
    },
    {
      quote: "Nothing ever changes. It's just school, school, school. But not today. Today, I go for the gusto.",
      source: "Calvin"
    },
    {
      quote: "Know what I pray for? The strength to change what I can, the inability to accept what I can't, and the incapacity to tell the difference.",
      source: "Calvin"
    }
  ],

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.render();
  },

  render: function() {
    var quote = this.quotes[Math.floor(Math.random()*this.quotes.length)];
    this.$el.html(this.template(quote));
  },

  show_signup: function() {
    this.atc.trigger('show-signup');
  },

  show_login: function() {
    this.atc.trigger('show-login');
  },

  page_left: function(e) {
    e.preventDefault();
    this.atc.trigger('page-left');
  }
});